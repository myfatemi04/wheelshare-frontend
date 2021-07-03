import { useContext, useEffect, useState } from 'react';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import AuthenticationContext from './AuthenticationContext';
import { createSession } from './createSession';

function useCode() {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const code = query.get('code');

	return code;
}

export default function Authenticator() {
	const { provider } = useParams<{ provider: string }>();
	const code = useCode();
	const { refresh } = useContext(AuthenticationContext);

	const [pending, setPending] = useState(true);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		if (token) {
			localStorage.setItem('session_token', token);
		} else {
			localStorage.removeItem('session_token');
		}
	}, [token]);

	useEffect(() => {
		setPending(true);
		createSession(code!)
			.then(({ token }) => {
				setToken(token ?? null);
			})
			.finally(() => setPending(false));
	}, [code, provider]);

	useEffect(() => {
		refresh();
	}, [token, refresh]);

	if (pending) {
		return <h1>Signing In</h1>;
	}

	if (token) {
		return <Redirect to="/" />;
	}

	// If we aren't pending anymore, but don't have a token, we must have errored
	return <h1>Sign In Error</h1>;
}
