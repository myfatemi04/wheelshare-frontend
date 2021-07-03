import { useCallback, useEffect, useState } from 'react';
import { getMe } from '../api';
import AuthenticationContext, { User } from './AuthenticationContext';

export default function AuthenticationWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	// Prevent race conditions
	const [user, setUser] = useState<User | null>(null);

	const refresh = useCallback(() => {
		const none = () => setUser(null);
		const sessionToken = localStorage.getItem('session_token');

		if (sessionToken) {
			getMe().then(setUser).catch(none);
		} else {
			none();
		}
	}, []);

	useEffect(refresh, [refresh]);

	return (
		<AuthenticationContext.Provider value={{ user, refresh }}>
			{children}
		</AuthenticationContext.Provider>
	);
}
