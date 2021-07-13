import { useContext, useEffect, useState } from 'react';
import { getReceivedInvitationsAndRequests } from './api';
import AuthenticationContext from './Authentication/AuthenticationContext';
import { IInvitation } from './types';

export const useAuth = () => useContext(AuthenticationContext);
export const useMe = () => useAuth().user;

export function useNotifications() {
	const [notifications, setNotifications] = useState<IInvitation[]>([]);

	useEffect(() => {
		getReceivedInvitationsAndRequests().then(setNotifications);
	}, []);

	return notifications;
}
