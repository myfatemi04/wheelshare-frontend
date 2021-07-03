import { useCallback, useEffect, useState } from 'react';
import { getMe } from '../api';
import AuthenticationContext, { AuthState } from './AuthenticationContext';

export default function AuthenticationWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const sessionToken = localStorage.getItem('session_token');
	// Prevent race conditions
	const [authState, setAuthState] = useState<AuthState>({
		isLoggedIn: null,
		user: null,
		refreshAuthState: null,
	});

	const refreshAuthState = useCallback(() => {
		const loggedOut = () =>
			setAuthState({ isLoggedIn: false, user: null, refreshAuthState });

		if (sessionToken) {
			getMe()
				.then((user) => {
					if (user) {
						setAuthState({ isLoggedIn: true, user, refreshAuthState });
					} else {
						loggedOut();
					}
				})
				.catch(loggedOut);
		} else {
			loggedOut();
		}
	}, [sessionToken]);

	useEffect(() => {
		refreshAuthState();
	}, [refreshAuthState]);

	return (
		<AuthenticationContext.Provider value={authState}>
			{children}
		</AuthenticationContext.Provider>
	);
}
