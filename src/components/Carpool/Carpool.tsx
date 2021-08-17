import { createContext, useCallback, useEffect, useMemo } from 'react';
import {
	acceptCarpoolRequest,
	cancelCarpoolInvite,
	denyCarpoolRequest,
	getCarpool,
	leaveCarpool,
	sendCarpoolInvite,
} from '../api';
import { useMe } from '../hooks';
import { ICarpool } from '../types';
import UILink from '../UI/UILink';
import UISecondaryBox from '../UI/UISecondaryBox';
import useImmutable from '../useImmutable';
import CarpoolDetails from './CarpoolDetails';
import CarpoolMap from './CarpoolMap';
import CarpoolMapLegend from './CarpoolMapLegend';
import CarpoolRouteEstimator from './CarpoolRouteEstimator';
import CarpoolTopButtons from './CarpoolTopButtons';
import MemberList from './MemberList';
import Members from './Members';

type CarpoolState = {
	id: number;
	name: string;
	event: ICarpool['event'];
	members: { id: number; name: string }[];
	invitations: Record<number, ICarpool['invitations'][0]>;
	creatorId: number;
	note: string;
};

export const CarpoolContext = createContext({
	carpool: {} as CarpoolState,
	async sendInvite(user: { id: number; name: string }) {
		console.error('not implemented: sendInvite');
	},
	async cancelInvite(user: { id: number; name: string }) {
		console.error('not implemented: cancelInvite');
	},
	async acceptRequest(userId: number) {
		console.error('not implemented: acceptRequest');
	},
	async denyRequest(userId: number) {
		console.error('not implemented: denyRequest');
	},
	leave() {
		console.error('not implemented: leave');
	},
});

export default function Carpool({ id }: { id: number }) {
	const [carpool, setCarpool] = useImmutable<CarpoolState | null>(null);

	const me = useMe();
	const isCreator = useMemo(
		() => carpool?.creatorId === me?.id,
		[carpool?.creatorId, me?.id]
	);

	useEffect(() => {
		getCarpool(id)
			.then((carpool) => {
				const invitationsMap: Record<number, ICarpool['invitations'][0]> = {};
				carpool.invitations.forEach((invite) => {
					invitationsMap[invite.user.id] = invite;
				});
				setCarpool({
					id: carpool.id,
					note: carpool.note,
					name: carpool.name,
					event: carpool.event,
					members: carpool.members,
					creatorId: carpool.creatorId,
					invitations: invitationsMap,
				});
			})
			.catch(console.error); // TODO error handling
	}, [id, setCarpool]);

	const acceptRequest = useCallback(
		async (userId: number) => {
			if (!isCreator) {
				console.error('Trying to accept request as noncreator');
				return;
			}
			if (!carpool) {
				console.error(
					'Trying to accept request when carpool has not been loaded.'
				);
				return;
			}
			await acceptCarpoolRequest(id, userId);
			const invite = carpool.invitations[userId];
			const name = invite.user.name;
			delete carpool.invitations[userId];
			carpool.members.push({ id: userId, name });
		},
		[carpool, id, isCreator]
	);

	const denyRequest = useCallback(
		async (userId: number) => {
			if (!isCreator) {
				console.error('Trying to deny request as noncreator');
				return;
			}
			if (!carpool) {
				console.error(
					'Trying to deny request when carpool has not been loaded.'
				);
				return;
			}
			await denyCarpoolRequest(id, userId);
			delete carpool.invitations[userId];
		},
		[carpool, id, isCreator]
	);

	const sendInvite = useCallback(
		async (user: { id: number; name: string }) => {
			if (!isCreator) {
				console.error('Trying to send invitation as noncreator');
				return;
			}
			if (!carpool) {
				console.error(
					'Trying to send invite when carpool has not been loaded.'
				);
				return;
			}
			try {
				await sendCarpoolInvite(id, user.id);
				carpool.invitations[user.id] = { isRequest: false, user };
			} catch (e) {
				console.error(e);
			}
		},
		[carpool, id, isCreator]
	);

	const cancelInvite = useCallback(
		async (user: { id: number; name: string }) => {
			if (!isCreator) {
				console.error('Trying to cancel invitation as noncreator');
				return;
			}
			if (!carpool) {
				console.error(
					'Trying to cancel invite when carpool has not been loaded.'
				);
				return;
			}
			try {
				await cancelCarpoolInvite(id, user.id);
			} catch (e) {
				console.error(e);
			}
			delete carpool.invitations[user.id];
		},
		[carpool, id, isCreator]
	);

	const creatorName = useMemo(
		() => carpool?.members.find((m) => m.id === carpool.creatorId)?.name,
		[carpool]
	);

	const eventId = carpool?.event.id;

	const leave = useCallback(async () => {
		if (eventId) {
			try {
				await leaveCarpool(id);
				window.location.href = '/events/' + eventId;
			} catch (e) {
				console.error(e);
			}
		}
	}, [eventId, id]);

	if (!carpool) {
		return <>Loading...</>;
	}

	return (
		<CarpoolContext.Provider
			value={{
				carpool,
				sendInvite,
				cancelInvite,
				acceptRequest,
				denyRequest,
				leave,
			}}
		>
			<UISecondaryBox
				style={{
					width: '45rem',
					maxWidth: 'min(45rem, 100vw)',
					alignItems: 'center',
				}}
			>
				<h1>{carpool.name}</h1>
				{isCreator
					? 'You are the creator of this carpool.'
					: `${creatorName} is the creator of this carpool`}
				<CarpoolTopButtons />
				<CarpoolDetails />
				<Members>
					<h2 style={{ marginBlockEnd: 0 }}>Map</h2>
					<CarpoolMapLegend />
					<CarpoolMap />
					<CarpoolRouteEstimator />
					<MemberList />
				</Members>
			</UISecondaryBox>
		</CarpoolContext.Provider>
	);
}
