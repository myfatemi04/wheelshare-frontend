import { createContext, ReactNode, useCallback, useState } from 'react';
import * as immutable from 'immutable';
import * as api from '../../components/api';

export const NotificationsContext = createContext({
	invitedCarpoolIds: immutable.Set<number>(),
	requestedCarpoolIds: immutable.Set<number>(),

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
	// eslint-disable-next-line
	const [invitedCarpoolIds, _setInvitedCarpoolIds] = useState(
		immutable.Set<number>()
	);

	const [requestedCarpoolIds, setRequestedCarpoolIds] = useState(
		immutable.Set<number>()
	);

	const sendCarpoolRequest = useCallback((carpoolId: number) => {
		api
			.sendCarpoolRequest(carpoolId)
			.then(() => setRequestedCarpoolIds((ids) => ids.add(carpoolId)));
	}, []);

	const cancelCarpoolRequest = useCallback((carpoolId: number) => {
		api
			.cancelCarpoolRequest(carpoolId)
			.then(() => setRequestedCarpoolIds((ids) => ids.delete(carpoolId)));
	}, []);

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
