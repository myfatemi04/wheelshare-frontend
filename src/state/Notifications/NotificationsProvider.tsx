import { createContext, ReactNode, useCallback } from 'react';
import * as api from '../../components/api';
import { useEffect } from 'react';
import useImmutable from '../../components/useImmutable';

export const NotificationsContext = createContext({
	invitedCarpoolIds: {} as Record<number, boolean>,
	requestedCarpoolIds: {} as Record<number, boolean>,

	sendCarpoolRequest: (carpoolId: number) =>
		console.error('not implemented: sendCarpoolRequest'),

	cancelCarpoolRequest: (carpoolId: number) =>
		console.error('not implemented: cancelCarpoolRequest'),
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
		(carpoolId: number) => {
			api.sendCarpoolRequest(carpoolId).then(() => {
				requestedCarpoolIds[carpoolId] = true;
			});
		},
		[requestedCarpoolIds]
	);

	const cancelCarpoolRequest = useCallback(
		(carpoolId: number) => {
			api.cancelCarpoolRequest(carpoolId).then(() => {
				delete requestedCarpoolIds[carpoolId];
			});
		},
		[requestedCarpoolIds]
	);

	return (
		<NotificationsContext.Provider
			value={{
				invitedCarpoolIds,
				requestedCarpoolIds,
				sendCarpoolRequest,
				cancelCarpoolRequest,
			}}
		>
			{children}
		</NotificationsContext.Provider>
	);
}
