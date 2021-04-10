import { useCallback, useEffect, useState } from 'react';
import { getMe } from '../api/api';
import AuthContext, { AuthState } from './AuthenticationContext';

export default function AuthenticationWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const sessionId = localStorage.getItem('session_id');
	// Prevent race conditions
	const [authState, setAuthState] = useState<AuthState>({
		isLoggedIn: null,
		user: null,
		refreshAuthState: null,
	});

	const refreshAuthState = useCallback(() => {
		if (sessionId) {
			getMe().then((user) => {
				setAuthState({ isLoggedIn: true, user, refreshAuthState });
			});
		} else {
			setAuthState({ isLoggedIn: false, user: null, refreshAuthState });
		}
	}, [sessionId]);

	useEffect(() => {
		refreshAuthState();
	}, [refreshAuthState]);

	if (authState?.isLoggedIn == null) {
		return null;
	} else {
		return (
			<AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
		);
	}
}
