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

export default function Authenticator() {
	const { provider } = useParams<{ provider: string }>();
	const [code, error] = useCodeAndError();
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
		if (code) {
			setPending(true);
			createSession(code, inferRedirectUrl())
				.then(({ token }) => {
					setToken(token ?? null);
				})
				.finally(() => setPending(false));
		}
	}, [code, provider]);

	useEffect(() => {
		// Refresh when the token changes
		refresh();
	}, [token, refresh]);

	let children: JSX.Element;

	if (error != null) {
		switch (error) {
			case 'access_denied':
				children = (
					<>
						<h1>Sign In Error</h1>
						We couldn't use your Ion account to log in.
						<br />
						<br />
						<a href="/">Home</a>
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
				<br />
				<br />
				<a href="/">Home</a>
			</>
		);
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{children}
		</div>
	);
}
