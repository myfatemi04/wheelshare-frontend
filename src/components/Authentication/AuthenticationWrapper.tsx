import { useCallback, useEffect, useState } from 'react';
import { getMe } from '../../api/api';
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
		if (sessionToken) {
			getMe().then((user) => {
				if (user) {
					setAuthState({ isLoggedIn: true, user, refreshAuthState });
				} else {
					setAuthState({ isLoggedIn: false, user: null, refreshAuthState });
				}
			});
		} else {
			setAuthState({ isLoggedIn: false, user: null, refreshAuthState });
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
