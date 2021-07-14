import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { useEffect } from 'react';
import { useCallback, useContext, useMemo, useState } from 'react';
import { lightgrey } from '../../lib/colors';
import {
	useCancelCarpoolRequest,
	useInvitationState,
	useSendCarpoolRequest,
} from '../../state/Notifications/NotificationsHooks';
import { createCarpool } from '../api';
import { useMe } from '../hooks';
import { IEvent } from '../types';
import UIButton from '../UI/UIButton';
import UILink from '../UI/UILink';
import EventContext from './EventContext';

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
				style={{ fontWeight: 600, cursor: 'pointer' }}
				onClick={() => {
					window.location.href = '/carpools/' + carpool.id;
				}}
			>
				{carpool.name}
			</span>
			<br />
			<br />
			{/* <div style={{ display: 'flex', alignItems: 'center' }}>
					<CallMergeIcon style={{ marginRight: '1rem' }} />{' '}
					<b>{carpool.extraDistance} miles</b>
				</div> */}
			{/* </div> */}
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

type CreationStatus = null | 'pending' | 'completed' | 'errored';

export default function Carpools() {
	const { event, tentativeInvites, signups, setHasCarpool } =
		useContext(EventContext);
	const [creationStatus, setCreationStatus] = useState<CreationStatus>(null);
	const [createdCarpoolId, setCreatedCarpoolId] = useState<null | number>(null);

	const me = useMe()!;
	const myCarpool = useMemo(
		() =>
			event.carpools.find((carpool) =>
				carpool.members.some((member) => member.id === me.id)
			),
		[event.carpools, me.id]
	);
	const alreadyInCarpool =
		myCarpool !== undefined || creationStatus === 'completed';

	useEffect(() => {
		setHasCarpool(alreadyInCarpool);
	}, [alreadyInCarpool, setHasCarpool]);

	const createCarpoolCallback = useCallback(() => {
		setCreationStatus('pending');

		createCarpool({
			name: me.name + "'s Carpool",
			eventId: event.id,
			invitedUserIds: tentativeInvites.toArray(),
		})
			.then(({ id }) => {
				setCreatedCarpoolId(id);
				setCreationStatus('completed');
			})
			.catch(() => {
				setCreationStatus('errored');
			});
	}, [event.id, me.name, tentativeInvites]);

	const tentativeInviteNames = useMemo(() => {
		if (!signups) return [];
		const names = tentativeInvites.map((id) => {
			const signup = signups.find((s) => s.user.id === id);
			return signup?.user.name;
		});
		const nonNull = names.filter((n) => n != null);
		return nonNull.toArray() as string[];
	}, [tentativeInvites, signups]);

	let createCarpoolSection;

	if (tentativeInviteNames.length > 0) {
		const inviteeCount = tentativeInviteNames.length;
		const peoplePlural = inviteeCount > 1 ? 'People' : 'Person';
		createCarpoolSection = (
			<>
				<br />
				<b>You have invited these people to carpool with you:</b>
				{tentativeInviteNames.join(',')}
				<UIButton
					onClick={createCarpoolCallback}
					style={{ backgroundColor: lightgrey }}
				>
					{creationStatus === null
						? `Create Carpool With ${inviteeCount} ${peoplePlural}`
						: creationStatus === 'pending'
						? 'Creating...'
						: 'Errored'}
				</UIButton>
			</>
		);
	} else
		createCarpoolSection = (
			<>
				<span>Available to drive?</span>
				<UIButton
					onClick={createCarpoolCallback}
					style={{ backgroundColor: lightgrey }}
				>
					{creationStatus === null
						? 'Create Empty Carpool'
						: creationStatus === 'pending'
						? 'Creating...'
						: 'Errored'}
				</UIButton>
			</>
		);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h3 style={{ marginBottom: '0' }}>Carpools</h3>
			{creationStatus === 'completed' ? (
				<span>
					Created{' '}
					<UILink href={`/carpools/${createdCarpoolId}`}>your carpool</UILink>!
				</span>
			) : myCarpool ? (
				<span>
					You are already in a carpool for this event:{' '}
					<UILink href={`/carpools/${myCarpool.id}`}>{myCarpool.name}</UILink>
				</span>
			) : (
				createCarpoolSection
			)}
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
