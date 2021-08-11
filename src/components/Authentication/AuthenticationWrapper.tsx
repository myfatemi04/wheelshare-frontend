import { useCallback, useEffect, useState } from 'react';
import { getMe } from '../api';
import AuthenticationContext, { User } from './AuthenticationContext';

export default function AuthenticationWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = useState<User | null>(null);
	const [loaded, setLoaded] = useState(false);

	const refresh = useCallback(() => {
		async function refresh_() {
			const sessionToken = localStorage.getItem('session_token');

			if (sessionToken) {
				const user = await getMe();
				if (!('status' in user && user.status === 'error')) {
					setUser(user);
					return;
				}
			}
			setUser(null);
		}
		refresh_().finally(() => setLoaded(true));
	}, []);

	useEffect(refresh, [refresh]);

	return (
		<AuthenticationContext.Provider value={{ user, refresh, loaded }}>
			{children}
		</AuthenticationContext.Provider>
	);
}
