import CancelIcon from '@material-ui/icons/Cancel';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useMemo } from 'react';
import { useContext, useEffect, useState } from 'react';
import { getEventSignups } from '../api';
import { useMe } from '../hooks';
import { IEventSignup } from '../types';
import { CarpoolContext } from './Carpool';

function InvitationRow({
	user,
	isInvited,
}: {
	user: { id: number; name: string };
	isInvited: boolean;
}) {
	const { sendInvite, cancelInvite } = useContext(CarpoolContext);
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '0.25rem',
			}}
		>
			<span>{user.name}</span>
			{isInvited ? (
				<CancelIcon
					onClick={() => cancelInvite(user)}
					style={{ cursor: 'pointer' }}
				/>
			) : (
				<PersonAddIcon
					onClick={() => sendInvite(user)}
					style={{ cursor: 'pointer' }}
				/>
			)}
		</div>
	);
}

export default function InvitationList() {
	const { carpool } = useContext(CarpoolContext);
	const me = useMe()!;

	const eventId = carpool.event.id;

	const [availableSignups, setAvailableSignups] =
		useState<IEventSignup[] | null>(null);

	useEffect(() => {
		getEventSignups(eventId).then((signups) =>
			setAvailableSignups(signups.filter((signup) => signup.user.id !== me.id))
		);
	}, [eventId, me.id]);

	const invitedUserIDs = useMemo(
		() =>
			new Set(
				carpool.invitations
					.filter((invitation) => !invitation.isRequest)
					.valueSeq()
					.map((invitation) => invitation.user.id)
			),
		[carpool.invitations]
	);

	const availableSignupsAlreadyInvited = useMemo(
		() =>
			availableSignups?.filter((signup) =>
				invitedUserIDs.has(signup.user.id)
			) ?? null,
		[availableSignups, invitedUserIDs]
	);

	const availableSignupsNotInvited = useMemo(
		() =>
			availableSignups
				? availableSignups.filter(
						(signup) => !invitedUserIDs.has(signup.user.id)
				  )
				: null,
		[availableSignups, invitedUserIDs]
	);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				maxHeight: '30rem',
				marginBottom: '1rem',
			}}
		>
			<h1 style={{ marginBottom: '0.25rem' }}>Invite Somebody</h1>
			{availableSignups === null && 'Loading'}
			{availableSignupsAlreadyInvited?.map((signup) => (
				<InvitationRow
					key={signup.user.id}
					user={signup.user}
					isInvited={true}
				/>
			))}
			{availableSignupsNotInvited?.map((signup) => (
				<InvitationRow
					key={signup.user.id}
					user={signup.user}
					isInvited={false}
				/>
			))}
		</div>
	);
}
