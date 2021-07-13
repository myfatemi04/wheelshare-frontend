import { useMemo } from 'react';
import { createContext, useCallback, useEffect, useState } from 'react';
import {
	cancelCarpoolInvite,
	getCarpool,
	leaveCarpool,
	sendCarpoolInvite,
} from '../api';
import { useMe } from '../hooks';
import { ICarpool } from '../types';
import UISecondaryBox from '../UI/UISecondaryBox';
import CarpoolDetails from './CarpoolDetails';
import InvitationsAndRequests from './InvitationsAndRequests';
import MemberList from './MemberList';

export const CarpoolContext = createContext({
	carpool: null! as ICarpool,
	sendInvite: (user: { id: number; name: string }) => {
		console.error('not implemented: sendInvite');
	},
	cancelInvite: (user: { id: number; name: string }) => {
		console.error('not implemented: cancelInvite');
	},
	leave: () => {
		console.error('not implemented: leave');
	},
});

export default function Carpool({ id }: { id: number }) {
	const [carpool, setCarpool] = useState<ICarpool | null>(null);

	useEffect(() => {
		getCarpool(id).then(setCarpool);
	}, [id]);

	const sendInvite = useCallback(
		(user: { id: number; name: string }) => {
			if (carpool) {
				sendCarpoolInvite(id, user.id)
					.then(() => {
						setCarpool(
							(carpool) =>
								carpool && {
									...carpool,
									invitations: [
										...carpool.invitations,
										{ isRequest: false, user },
									],
								}
						);
					})
					.catch(console.error);
			} else {
				console.error(
					'Trying to send invite when carpool has not been loaded.'
				);
			}
		},
		[carpool, id]
	);

	const cancelInvite = useCallback(
		(user: { id: number; name: string }) => {
			cancelCarpoolInvite(id, user.id)
				.then(() => {
					setCarpool(
						(carpool) =>
							carpool && {
								...carpool,
								invitations: carpool.invitations.filter(
									(invite) => invite.user.id !== user.id
								),
							}
					);
				})
				.catch(console.error);
		},
		[id]
	);

	const eventId = carpool?.eventId;

	const leave = useCallback(() => {
		if (eventId) {
			leaveCarpool(id)
				.then(() => {
					window.location.href = '/events/' + eventId;
				})
				.catch(console.error);
		}
	}, [eventId, id]);

	const me = useMe();

	const isMember = useMemo(
		() => carpool?.members.some((m) => m.id === me?.id),
		[carpool?.members, me?.id]
	);

	if (!carpool) {
		return <>Loading...</>;
	}

	return (
		<CarpoolContext.Provider
			value={{
				carpool,
				sendInvite,
				cancelInvite,
				leave,
			}}
		>
			<UISecondaryBox style={{ width: '100%', alignItems: 'center' }}>
				{carpool ? (
					<>
						<h1 style={{ marginBottom: '0rem' }}>{carpool.name}</h1>
						<h2 style={{ marginBottom: '0rem' }}>{carpool.event.name}</h2>
						{isMember && <InvitationsAndRequests />}
						<CarpoolDetails carpool={carpool} />
						<MemberList members={carpool.members} />
					</>
				) : (
					<h2>Loading</h2>
				)}
			</UISecondaryBox>
		</CarpoolContext.Provider>
	);
}
