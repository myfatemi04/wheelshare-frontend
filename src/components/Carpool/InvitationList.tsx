import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { getEventSignups } from '../api';
import { ICarpool, IEventSignup } from '../types';

function InvitationRow({
	carpoolId,
	userId,
	userName,
	isInvited,
}: {
	carpoolId: number;
	userId: number;
	userName: string;
	isInvited: boolean;
}) {
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
			<span>{userName}</span>
		</div>
	);
}

export default function InvitationList({ carpool }: { carpool: ICarpool }) {
	const eventId = carpool.event.id;

	const [availableSignups, setAvailableSignups] =
		useState<IEventSignup[] | null>(null);

	useEffect(() => {
		getEventSignups(eventId).then(setAvailableSignups);
	}, [eventId]);

	const existingSignups = useMemo(
		() =>
			new Set(
				carpool.invitations
					.filter((invitation) => !invitation.isRequest)
					.map((invitation) => invitation.user.id)
			),
		[carpool]
	);

	const availableSignupsAlreadyInvited = useMemo(
		() =>
			availableSignups
				? availableSignups.filter((signup) =>
						existingSignups.has(signup.userId)
				  )
				: null,
		[availableSignups, existingSignups]
	);

	const availableSignupsNotInvited = useMemo(
		() =>
			availableSignups
				? availableSignups.filter(
						(signup) => !existingSignups.has(signup.userId)
				  )
				: null,
		[availableSignups, existingSignups]
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
			{availableSignupsNotInvited?.map((signup) => (
				<InvitationRow
					key={signup.user.id}
					userId={signup.user.id}
					userName={signup.user.name}
					carpoolId={carpool.id}
					isInvited={false}
				/>
			))}
			{availableSignupsAlreadyInvited?.map((signup) => (
				<InvitationRow
					key={signup.userId}
					userId={signup.user.id}
					userName={signup.user.name}
					carpoolId={carpool.id}
					isInvited
				/>
			))}
		</div>
	);
}
