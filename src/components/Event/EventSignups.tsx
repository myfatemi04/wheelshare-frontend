import CancelIcon from '@material-ui/icons/Cancel';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useContext, useMemo } from 'react';
import { PlaceDetails } from '../../lib/getPlaceDetails';
import latlongdist, { R_miles } from '../../lib/latlongdist';
import { useMe } from '../hooks';
import { IEventSignup } from '../types';
import usePlace from '../usePlace';
import EventContext from './EventContext';

function EventSignup({
	signup,
	locationLatitude,
	locationLongitude,
	myPlaceDetails,
}: {
	signup: IEventSignup;
	locationLatitude: number;
	locationLongitude: number;
	myPlaceDetails: PlaceDetails | null;
}) {
	const { user, latitude, longitude } = signup;
	const me = useMe();
	const {
		addTentativeInvite,
		removeTentativeInvite,
		tentativeInvites,
		hasCarpool,
	} = useContext(EventContext);

	let extraDistance = useMemo(() => {
		if (myPlaceDetails != null && !(latitude === null || longitude === null)) {
			const myLatitude = myPlaceDetails.latitude;
			const myLongitude = myPlaceDetails.longitude;
			const meToThem = latlongdist(
				latitude,
				longitude,
				locationLongitude,
				locationLatitude,
				R_miles
			);
			const themToLocation = latlongdist(
				latitude,
				longitude,
				myLatitude,
				myLongitude,
				R_miles
			);
			const totalWithThem = meToThem + themToLocation;
			const totalWithoutThem = latlongdist(
				locationLongitude,
				locationLatitude,
				myLatitude,
				myLongitude,
				R_miles
			);
			return totalWithThem - totalWithoutThem;
		} else {
			return null;
		}
	}, [
		latitude,
		longitude,
		locationLatitude,
		locationLongitude,
		myPlaceDetails,
	]);

	const isTentativelyInvited = useMemo(
		() => tentativeInvites.has(signup.user.id),
		[signup.user.id, tentativeInvites]
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
			<b>{user.name}</b>
			{extraDistance ? `: +${extraDistance.toFixed(1)} miles` : ''}

			{!hasCarpool &&
				(isTentativelyInvited ? (
					<CancelIcon
						onClick={() => removeTentativeInvite(user.id)}
						style={{ cursor: 'pointer' }}
					/>
				) : (
					<PersonAddIcon
						onClick={() => addTentativeInvite(user.id)}
						style={{ cursor: 'pointer' }}
					/>
				))}
		</div>
	);
}

export default function EventSignups({
	signups,
	myPlaceId,
}: {
	signups: IEventSignup[];
	myPlaceId: string | null;
}) {
	const { event } = useContext(EventContext);
	const carpools = event.carpools;
	const myPlaceDetails = usePlace(myPlaceId);

	const signupsWithoutCarpool = useMemo(() => {
		// A list of users not in any carpool
		const members = carpools.map((c) => c.members);
		const allMembers = members.reduce((a, b) => a.concat(b), []);
		const allMembersIds = allMembers.map((m) => m.id);
		return signups.filter((s) => !allMembersIds.includes(s.user.id));
	}, [signups, carpools]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h3 style={{ marginBlockEnd: '0' }}>People without a carpool</h3>
			{signupsWithoutCarpool.map((signup) => (
				<EventSignup
					key={signup.user.id}
					signup={signup}
					myPlaceDetails={myPlaceDetails}
					locationLatitude={event.latitude}
					locationLongitude={event.longitude}
				/>
			))}
		</div>
	);
}
