import * as immutable from 'immutable';
import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	cancelCarpoolInvite,
	getCarpool,
	leaveCarpool,
	sendCarpoolInvite,
} from '../api';
import { useMe } from '../hooks';
import UISecondaryBox from '../UI/UISecondaryBox';
import CarpoolDetails from './CarpoolDetails';
import InvitationsAndRequests from './InvitationsAndRequests';
import MemberList from './MemberList';

class CarpoolState extends immutable.Record({
	id: 0,
	name: '',
	eventId: -1,
	event: {
		id: -1,
		name: '',
		formattedAddress: '',
		latitude: 0,
		longitude: 0,
		placeId: '',
	},
	members: immutable.List<{ id: number; name: string }>(),
	invitations:
		immutable.Map<
			number,
			{ isRequest: boolean; user: { id: number; name: string } }
		>(),
}) {}

export const CarpoolContext = createContext({
	carpool: new CarpoolState(),
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
	const [carpool, setCarpool] = useState(new CarpoolState());

	useEffect(() => {
		getCarpool(id).then((carpool) => {
			setCarpool(
				new CarpoolState({
					id: carpool.id,
					name: carpool.name,
					eventId: carpool.eventId || carpool.event.id,
					event: carpool.event,
					members: immutable.List(carpool.members),
					invitations: immutable.Map(
						carpool.invitations.map((invite) => [invite.user.id, invite])
					),
				})
			);
		});
	}, [id]);

	const sendInvite = useCallback(
		(user: { id: number; name: string }) => {
			if (carpool) {
				sendCarpoolInvite(id, user.id)
					.then(() => {
						setCarpool((carpool) =>
							carpool.set(
								'invitations',
								carpool.invitations.set(user.id, { isRequest: false, user })
							)
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

	const eventId = carpool.eventId;

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
