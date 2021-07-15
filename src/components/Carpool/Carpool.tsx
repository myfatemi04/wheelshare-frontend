import { createContext, useCallback, useEffect, useMemo } from 'react';
import {
	cancelCarpoolInvite,
	getCarpool,
	leaveCarpool,
	sendCarpoolInvite,
} from '../api';
import { useMe } from '../hooks';
import { ICarpool } from '../types';
import UISecondaryBox from '../UI/UISecondaryBox';
import useImmutable from '../useImmutable';
import CarpoolDetails from './CarpoolDetails';
import InvitationsAndRequests from './InvitationsAndRequests';
import MemberList from './MemberList';

type CarpoolState = {
	id: number;
	name: string;
	event: ICarpool['event'];
	members: { id: number; name: string }[];
	invitations: Record<number, ICarpool['invitations'][0]>;
};

export const CarpoolContext = createContext({
	carpool: {} as CarpoolState,
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
	const [carpool, setCarpool] = useImmutable<CarpoolState>({
		id,
		name: '',
		event: {} as ICarpool['event'],
		members: [],
		invitations: {},
	});

	useEffect(() => {
		getCarpool(id).then((carpool) => {
			const invitationsMap: Record<number, ICarpool['invitations'][0]> = {};
			carpool.invitations.forEach((invite) => {
				invitationsMap[invite.user.id] = invite;
			});
			setCarpool({
				id: carpool.id,
				name: carpool.name,
				event: carpool.event,
				members: carpool.members,
				invitations: invitationsMap,
			});
		});
	}, [id, setCarpool]);

	const sendInvite = useCallback(
		(user: { id: number; name: string }) => {
			if (carpool) {
				sendCarpoolInvite(id, user.id)
					.then(() => {
						carpool.invitations[user.id] = { isRequest: false, user };
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
					delete carpool.invitations[user.id];
				})
				.catch(console.error);
		},
		[carpool.invitations, id]
	);

	const eventId = carpool.event.id;

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
		() => carpool.members.some((m) => m.id === me?.id),
		[carpool.members, me?.id]
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
						<CarpoolDetails />
						<MemberList />
					</>
				) : (
					<h2>Loading</h2>
				)}
			</UISecondaryBox>
		</CarpoolContext.Provider>
	);
}
