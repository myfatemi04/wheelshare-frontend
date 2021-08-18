import CancelIcon from '@material-ui/icons/Cancel';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useContext, useMemo } from 'react';
import latlongdist, { R_miles } from '../../lib/latlongdist';
import { useMe } from '../hooks';
import { IEventSignup } from '../types';
import EventCarpoolCreateButton from './EventCarpoolCreateButton';
import EventContext from './EventContext';
import pickLatLong from './pickLatLong';
import { useCurrentEventSignup } from './EventHooks';

function EventSignup({ signup }: { signup: IEventSignup }) {
	const { user } = signup;
	const me = useMe();
	const { tentativeInvites, event } = useContext(EventContext);
	const mySignup = useCurrentEventSignup();
	const myLocation = pickLatLong(mySignup);
	const theirLocation = pickLatLong(signup);
	const eventLocation = pickLatLong(event)!;

	const extraDistance = useMemo(() => {
		if (myLocation != null && theirLocation != null) {
			const meToThem = latlongdist(myLocation, theirLocation, R_miles);
			const themToLocation = latlongdist(theirLocation, eventLocation, R_miles);
			const meToLocation = latlongdist(myLocation, eventLocation, R_miles);
			return meToThem + themToLocation - meToLocation;
		} else {
			return null;
		}
	}, [eventLocation, myLocation, theirLocation]);

	const isTentativelyInvited = signup.user.id in tentativeInvites;
	const hasCarpool = useMemo(
		() =>
			event.carpools.some((carpool) =>
				carpool.members.some((member) => member.id === me?.id)
			),
		[event.carpools, me?.id]
	);

	if (user.id === me?.id) {
		return null;
	}

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				position: 'relative',
				padding: '1rem',
				borderRadius: '0.5rem',
				border: '1px solid #e0e0e0',
				marginTop: '0.5rem',
				marginBottom: '0.5rem',
			}}
			key={user.id}
		>
			<span>
				<b>{user.name}</b>
				{extraDistance && ` +${extraDistance.toFixed(1)} miles`}{' '}
				{signup.canDrive && ' (can drive)'}
				{signup.note && (
					<>
						<br />
						<span style={{ fontStyle: 'italic' }}>{signup.note}</span>
					</>
				)}
			</span>

			{!hasCarpool &&
				(isTentativelyInvited ? (
					<CancelIcon
						onClick={() => delete tentativeInvites[user.id]}
						style={{ cursor: 'pointer' }}
					/>
				) : (
					<PersonAddIcon
						onClick={() => (tentativeInvites[user.id] = true)}
						style={{ cursor: 'pointer' }}
					/>
				))}
		</div>
	);
}

export default function EventSignups() {
	const { event } = useContext(EventContext);
	const signups = event.signups;
	const carpools = event.carpools;
	const me = useMe();

	const signupsWithoutCarpool = useMemo(() => {
		// A list of users not in any carpool
		const members = carpools.map((c) => c.members);
		const allMembers = members.reduce((a, b) => a.concat(b), []);
		const allMembersIds = allMembers.map((m) => m.id);
		return Object.keys(signups)
			.filter((id) => !allMembersIds.includes(+id))
			.map((id) => signups[id]);
	}, [signups, carpools]);

	const hasCarpool = useMemo(
		() =>
			event.carpools.some((carpool) =>
				carpool.members.some((member) => member.id === me?.id)
			),
		[event.carpools, me?.id]
	);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h3 style={{ marginBlockEnd: '0' }}>People without a carpool</h3>
			<EventCarpoolCreateButton />
			{!hasCarpool && (
				<span style={{ fontSize: '0.875em' }}>
					Click <PersonAddIcon style={{ fontSize: '0.875rem' }} /> to add
					someone to the temporary invite list
				</span>
			)}
			{signupsWithoutCarpool.map((signup) => (
				<EventSignup key={signup.user.id} signup={signup} />
			))}
		</div>
	);
}
