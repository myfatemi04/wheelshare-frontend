import { createContext, useCallback, useEffect } from 'react';
import {
	cancelCarpoolInvite,
	getCarpool,
	leaveCarpool,
	sendCarpoolInvite,
} from '../api';
import { ICarpool } from '../types';
import UILink from '../UI/UILink';
import UISecondaryBox from '../UI/UISecondaryBox';
import useImmutable from '../useImmutable';
import CarpoolDetails from './CarpoolDetails';
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
			if (!carpool) {
				return null;
			}
			cancelCarpoolInvite(id, user.id)
				.then(() => {
					delete carpool.invitations[user.id];
				})
				.catch(console.error);
		},
		[carpool, id]
	);

	const eventId = carpool?.event.id;

	const leave = useCallback(() => {
		if (eventId) {
			leaveCarpool(id)
				.then(() => {
					window.location.href = '/events/' + eventId;
				})
				.catch(console.error);
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
				leave,
			}}
		>
			<UISecondaryBox style={{ width: '100%', alignItems: 'center' }}>
				<h1>{carpool.name}</h1>
				<UILink href={'/events/' + carpool.event.id}>
					{carpool.event.name}
				</UILink>
				<CarpoolTopButtons />
				<CarpoolDetails />
				<Members>
					<CarpoolRouteEstimator />
				</Members>
				<MemberList />
			</UISecondaryBox>
		</CarpoolContext.Provider>
	);
}
