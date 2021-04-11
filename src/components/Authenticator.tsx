import { useContext, useEffect, useState } from 'react';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import { API_ENDPOINT } from '../api/api';
import { makeAPIPostCall } from '../api/utils';
import AuthenticationContext from './AuthenticationContext';

export default function Authenticator() {
	const { provider } = useParams<{ provider: string }>();
	const query = new URLSearchParams(useLocation().search);
	const code = query.get('code');
	const { refreshAuthState } = useContext(AuthenticationContext);
	const [status, setStatus] = useState<'pending' | 'errored' | 'authenticated'>(
		'pending'
	);

	useEffect(() => {
		makeAPIPostCall('/create_session', { code, provider })
			.then((response) => {
				if (response.data.status === 'success') {
					localStorage.setItem('session_token', response.data.token);
					refreshAuthState && refreshAuthState();
					setStatus('authenticated');
				} else {
					setStatus('errored');
				}
			})
			.catch(() => {
				setStatus('errored');
			});
	}, [code, provider, refreshAuthState]);

	switch (status) {
		case 'authenticated':
			return <Redirect to="/" />;
		case 'errored':
			return <h1>Sign In Error</h1>;
		case 'pending':
			return <h1>Signing In</h1>;
	}
}
