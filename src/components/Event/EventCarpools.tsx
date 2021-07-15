import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { useCallback, useContext, useMemo } from 'react';
import { Location } from '../../lib/estimateoptimalpath';
import {
	useCancelCarpoolRequest,
	useInvitationState,
	useSendCarpoolRequest,
} from '../../state/Notifications/NotificationsHooks';
import { useMe } from '../hooks';
import { IEvent } from '../types';
import useOptimalPath from '../useOptimalPath';
import usePlace from '../usePlace';
import EventContext from './EventContext';

function useMemberLocations(members: IEvent['carpools'][0]['members']) {
	const { signups } = useContext(EventContext);

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
				.filter(Boolean) as Location[],
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

	const {
		event: { latitude, longitude },
		myPlaceId,
	} = useContext(EventContext);

	const myLocation = usePlace(myPlaceId);

	const memberLocations = useMemberLocations(carpool.members);

	const pathInCarpool = useOptimalPath(memberLocations, {
		latitude,
		longitude,
	});

	const pathNotInCarpool = useOptimalPath(
		myLocation ? [...memberLocations, myLocation] : [],
		{
			latitude,
			longitude,
		}
	);

	const extraDistance =
		myLocation && pathInCarpool && pathNotInCarpool
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
			{/* <div> */}
			<span
				style={{ cursor: 'pointer' }}
				onClick={() => {
					window.location.href = '/carpools/' + carpool.id;
				}}
			>
				<b>{carpool.name}</b>
				{extraDistance !== null && ' +' + extraDistance.toFixed(1) + ' miles'}
			</span>
			<br />
			<br />
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
						// inviteState === 'invited
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
			{event.carpools.map((carpool) => (
				<CarpoolRow
					carpool={carpool}
					key={carpool.id}
					inCarpoolAlready={alreadyInCarpool}
				/>
			))}
		</div>
	);
}
