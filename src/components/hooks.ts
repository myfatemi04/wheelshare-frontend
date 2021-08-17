import { useCallback, useContext, useEffect, useState } from 'react';
import { getReceivedInvitationsAndRequests } from './api';
import AuthenticationContext from './Authentication/AuthenticationContext';
import { IInvitation } from './types';

export const useAuth = () => useContext(AuthenticationContext);
export const useMe = () => useAuth().user;

export function useNotifications() {
	const [notifications, setNotifications] = useState<IInvitation[]>([]);

	const refresh = useCallback(() => {
		getReceivedInvitationsAndRequests()
			.then(setNotifications)
			.catch(console.error); // TODO error handling
	}, []);

	useEffect(refresh, [refresh]);

	return [notifications, refresh] as const;
}
