import { useContext, useEffect, useState } from 'react';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import AuthenticationContext from './AuthenticationContext';
import { createSession } from './createSession';

function useCodeAndError() {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const code = query.get('code');
	const error = query.get('error');

	return [code, error];
}

function inferRedirectUrl() {
	// Strip query parameters
	const { protocol, host, pathname } = window.location;
	const redirectUrl = `${protocol}//${host}${pathname}`;
	return redirectUrl;
}

function useToken(
	code: string | null,
	provider: string
): [string | null, boolean] {
	const [pending, setPending] = useState(false);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		if (code) {
			setPending(true);
			createSession(code, provider, inferRedirectUrl())
				.then(({ token }) => {
					setToken(token ?? null);
				})
				.catch(console.error) // TODO error handling
				.finally(() => setPending(false));
		}
	}, [code, provider]);

	return [token, pending];
}

function useLocalStorageSync(key: string, value: string | null) {
	useEffect(() => {
		if (value) {
			localStorage.setItem(key, value);
		} else {
			localStorage.removeItem(key);
		}
	}, [key, value]);
}

function useRefresh(refresh: Function, watch: string | null) {
	useEffect(() => {
		refresh();
	}, [watch, refresh]);
}

export default function Authenticator() {
	const { provider } = useParams<{ provider: string }>();
	const [code, error] = useCodeAndError();
	const { refresh } = useContext(AuthenticationContext);

	const [token, pending] = useToken(code, provider);

	useLocalStorageSync('session_token', token);
	useRefresh(refresh, token);

	let children: JSX.Element;

	if (error != null) {
		switch (error) {
			case 'access_denied':
				children = (
					<>
						<h1>Sign In Error</h1>
						We couldn't authenticate your account.
					</>
				);
				break;
			default:
				console.error('Unhandled OAuth error case:', error);
				children = <h1>Sign In Error</h1>;
		}
	} else if (pending) {
		children = <h1>Signing In</h1>;
	} else if (token) {
		children = <Redirect to="/" />;
	} else {
		// If we aren't pending anymore, but don't have a token, we must have errored
		children = (
			<>
				<h1>Sign In Error</h1>
			</>
		);
	}

	return children;
}
