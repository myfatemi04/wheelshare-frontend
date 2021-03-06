import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { useCallback, useContext, useMemo } from 'react';
import {
	useCancelCarpoolRequest,
	useInvitationState,
	useSendCarpoolRequest,
} from '../../state/Notifications/NotificationsHooks';
import { useMe } from '../hooks';
import { IEvent, IEventSignupWithLocation } from '../types';
import useOptimalPath from '../useOptimalPath';
import EventContext from './EventContext';
import { useCurrentEventSignup } from './EventHooks';

function useMemberLocations(members: IEvent['carpools'][0]['members']) {
	const { event } = useContext(EventContext);
	const signups = event.signups;

	return useMemo(
		() =>
			members
				.map((member) => {
					const signup = signups[member.id];
					if (!signup) {
						return null;
					}
					if (signup.latitude === null) {
						return null;
					}
					return {
						latitude: signup.latitude,
						longitude: signup.longitude,
					};
				})
				.filter(Boolean) as IEventSignupWithLocation[],
		[members, signups]
	);
}

function CarpoolRow({
	carpool,
	inCarpoolAlready,
}: {
	carpool: IEvent['carpools'][0];
	inCarpoolAlready: boolean;
}) {
	const PADDING = '1rem';
	const inviteState = useInvitationState(carpool.id);

	const cancelCarpoolRequest = useCancelCarpoolRequest();
	const sendCarpoolRequest = useSendCarpoolRequest();

	const sendButton = useCallback(() => {
		sendCarpoolRequest(carpool.id);
	}, [sendCarpoolRequest, carpool.id]);

	const cancelButton = useCallback(() => {
		cancelCarpoolRequest(carpool.id);
	}, [cancelCarpoolRequest, carpool.id]);

	const { event } = useContext(EventContext);

	const mySignup = useCurrentEventSignup();

	const memberLocations = useMemberLocations(carpool.members);

	const pathInCarpool = useOptimalPath(memberLocations, event);

	const pathNotInCarpool = useOptimalPath(
		mySignup.latitude !== null ? [...memberLocations, mySignup] : [],
		event
	);

	const extraDistance =
		mySignup.latitude !== null && pathInCarpool && pathNotInCarpool
			? pathInCarpool.distance - pathNotInCarpool.distance
			: null;

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				position: 'relative',
				justifyContent: 'space-between',
				padding: PADDING,
				borderRadius: '0.5rem',
				border: '1px solid #e0e0e0',
				marginTop: '0.5rem',
				marginBottom: '0.5rem',
			}}
		>
			<span
				style={{ cursor: 'pointer' }}
				onClick={() => {
					window.location.href = '/carpools/' + carpool.id;
				}}
			>
				<b>{carpool.name}</b>
				{extraDistance !== null && ' +' + extraDistance.toFixed(1) + ' miles'}
				{carpool.note && ' - ' + carpool.note}
			</span>
			{!inCarpoolAlready && (
				<>
					{inviteState === 'none' ? (
						<EmojiPeopleIcon
							style={{ fontSize: '2em', cursor: 'pointer' }}
							onClick={sendButton}
						/>
					) : inviteState === 'requested' ? (
						<CancelIcon
							style={{ fontSize: '2em', cursor: 'pointer' }}
							onClick={cancelButton}
						/>
					) : (
						// inviteState === invited
						<CheckIcon style={{ fontSize: '2em', cursor: 'pointer' }} />
					)}
				</>
			)}
		</div>
	);
}

export default function Carpools() {
	const { event } = useContext(EventContext);

	const myId = useMe()?.id;

	const alreadyInCarpool = useMemo(
		() =>
			event.carpools.some((carpool) =>
				carpool.members.some((member) => member.id === myId)
			),
		[event.carpools, myId]
	);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h3 style={{ marginBottom: '0' }}>Carpools</h3>
			<span style={{ fontSize: '0.875rem' }}>
				Click <EmojiPeopleIcon style={{ fontSize: '0.875rem' }} /> to request to
				join a carpool.
			</span>
			{event.carpools.length > 0
				? event.carpools.map((carpool) => (
						<CarpoolRow
							carpool={carpool}
							key={carpool.id}
							inCarpoolAlready={alreadyInCarpool}
						/>
				  ))
				: 'No Carpools'}
		</div>
	);
}
