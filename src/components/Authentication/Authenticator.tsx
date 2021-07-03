import { useContext, useEffect, useState } from 'react';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import AuthenticationContext from './AuthenticationContext';
import { createSession } from './createSession';

export default function Authenticator() {
	const { provider } = useParams<{ provider: string }>();
	const query = new URLSearchParams(useLocation().search);
	const code = query.get('code');
	const { refreshAuthState } = useContext(AuthenticationContext);
	const [status, setStatus] =
		useState<'pending' | 'errored' | 'authenticated'>('pending');
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		createSession(code!)
			.then((data) => {
				if (data.status === 'success') {
					console.log('Success! Token:', data.token);
					setToken(data.token);
					localStorage.setItem('session_token', data.token);
					setStatus('authenticated');
				} else {
					console.log('Authentication failure.');
					setToken(null);
					localStorage.removeItem('session_token');
					setStatus('errored');
				}
			})
			.catch(() => {
				setStatus('errored');
			});
	}, [code, provider]);

	useEffect(() => {
		refreshAuthState && refreshAuthState();
	}, [token, refreshAuthState]);

	switch (status) {
		case 'authenticated':
			return <Redirect to="/" />;
		case 'errored':
			return <h1>Sign In Error</h1>;
		case 'pending':
			return <h1>Signing In</h1>;
	}
}
