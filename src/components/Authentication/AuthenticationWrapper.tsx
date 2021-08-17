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
				try {
					setUser(await getMe());
				} catch (e) {
					console.error(e);
					setUser(null);
				}
			} else {
				setUser(null);
			}
		}
		refresh_()
			.catch(console.error) // TODO error handling
			.finally(() => setLoaded(true));
	}, []);

	useEffect(refresh, [refresh]);

	return (
		<AuthenticationContext.Provider value={{ user, refresh, loaded }}>
			{children}
		</AuthenticationContext.Provider>
	);
}
