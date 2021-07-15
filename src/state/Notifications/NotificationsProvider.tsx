import { createContext, ReactNode, useCallback } from 'react';
import * as api from '../../components/api';
import { useEffect } from 'react';
import useImmutable from '../../components/useImmutable';

export const NotificationsContext = createContext({
	invitedCarpoolIds: {} as Record<number, boolean>,
	requestedCarpoolIds: {} as Record<number, boolean>,

	sendCarpoolRequest: async (carpoolId: number) =>
		console.error('not implemented: sendCarpoolRequest'),

	cancelCarpoolRequest: async (carpoolId: number) =>
		console.error('not implemented: cancelCarpoolRequest'),

	acceptCarpoolInvite: async (carpoolId: number) =>
		console.error('not implemented: acceptCarpoolInvite'),

	denyCarpoolInvite: async (carpoolId: number) =>
		console.error('not implemented: denyCarpoolInvite'),
});

export default function NotificationsProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [invitedCarpoolIds, setInvitedCarpoolIds] = useImmutable<
		Record<number, boolean>
	>({});
	const [requestedCarpoolIds, setRequestedCarpoolIds] = useImmutable<
		Record<number, boolean>
	>({});

	useEffect(() => {
		api.getSentRequestsAndInvites().then((invitations) => {
			const invited = {} as Record<number, boolean>;
			const requested = {} as Record<number, boolean>;
			for (let invitation of invitations) {
				if (invitation.isRequest) {
					invited[invitation.carpool.id] = true;
				} else {
					requested[invitation.carpool.id] = true;
				}
			}

			setInvitedCarpoolIds(invited);
			setRequestedCarpoolIds(requested);
		});
	}, [setInvitedCarpoolIds, setRequestedCarpoolIds]);

	const sendCarpoolRequest = useCallback(
		async (carpoolId: number) => {
			await api.sendCarpoolRequest(carpoolId);

			requestedCarpoolIds[carpoolId] = true;
		},
		[requestedCarpoolIds]
	);

	const cancelCarpoolRequest = useCallback(
		async (carpoolId: number) => {
			await api.cancelCarpoolRequest(carpoolId);

			delete requestedCarpoolIds[carpoolId];
		},
		[requestedCarpoolIds]
	);

	const acceptCarpoolInvite = useCallback(
		async (carpoolId: number) => {
			await api.acceptInvite(carpoolId);

			delete invitedCarpoolIds[carpoolId];
		},
		[invitedCarpoolIds]
	);

	const denyCarpoolInvite = useCallback(
		async (carpoolId: number) => {
			await api.denyInvite(carpoolId);

			delete invitedCarpoolIds[carpoolId];
		},
		[invitedCarpoolIds]
	);

	return (
		<NotificationsContext.Provider
			value={{
				invitedCarpoolIds,
				requestedCarpoolIds,
				sendCarpoolRequest,
				cancelCarpoolRequest,
				acceptCarpoolInvite,
				denyCarpoolInvite,
			}}
		>
			{children}
		</NotificationsContext.Provider>
	);
}
