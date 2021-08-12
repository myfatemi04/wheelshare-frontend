import { createContext, useCallback, useEffect } from 'react';
import {
	acceptCarpoolRequest,
	cancelCarpoolInvite,
	denyCarpoolRequest,
	getCarpool,
	leaveCarpool,
	sendCarpoolInvite,
} from '../api';
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

	const acceptRequest = useCallback(
		async (userId: number) => {
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
		[carpool, id]
	);

	const denyRequest = useCallback(
		async (userId: number) => {
			if (!carpool) {
				console.error(
					'Trying to deny request when carpool has not been loaded.'
				);
				return;
			}
			await denyCarpoolRequest(id, userId);
			delete carpool.invitations[userId];
		},
		[carpool, id]
	);

	const sendInvite = useCallback(
		async (user: { id: number; name: string }) => {
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
		[carpool, id]
	);

	const cancelInvite = useCallback(
		async (user: { id: number; name: string }) => {
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
		[carpool, id]
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
				style={{ width: '45rem', maxWidth: '100vw', alignItems: 'center' }}
			>
				<h1>{carpool.name}</h1>
				<UILink href={'/events/' + carpool.event.id}>
					{carpool.event.name}
				</UILink>
				<CarpoolTopButtons />
				<CarpoolDetails />
				<Members>
					<CarpoolRouteEstimator />
					<MemberList />
					<h2>Map</h2>
					<CarpoolMapLegend />
					<CarpoolMap />
				</Members>
			</UISecondaryBox>
		</CarpoolContext.Provider>
	);
}
