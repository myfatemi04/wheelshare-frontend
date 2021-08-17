function createIonAuthorizationEndpoint(redirectUrl: string) {
	const url = new URL('https://ion.tjhsst.edu/oauth/authorize');

	url.searchParams.set('response_type', 'code');
	url.searchParams.set('client_id', 'rNa6n9YSg8ftINdyVPpUsaMuxNbHLo9dh1OsOktR');
	url.searchParams.set('redirect_uri', redirectUrl);
	url.searchParams.set('scope', 'read');

	return url.toString();
}

export function createGoogleAuthorizationEndpoint(redirectUrl: string): string {
	const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');

	url.searchParams.set('access_type', 'offline');
	url.searchParams.set('prompt', 'consent');
	url.searchParams.set(
		'scope',
		[
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email',
		].join(' ')
	);
	url.searchParams.set('response_type', 'code');
	url.searchParams.set(
		'client_id',
		'413572867232-2l4usbr5ensmj235qt25ccg5dmlsem6q.apps.googleusercontent.com'
	);
	url.searchParams.set('redirect_uri', redirectUrl);

	return url.toString();
}

function getRedirectUrl(provider: 'ion' | 'google') {
	return `${window.location.protocol}//${window.location.host}/auth/${provider}/callback`;
}

export const googleAuthorizationEndpoint = createGoogleAuthorizationEndpoint(
	getRedirectUrl('google')
);

// window.location.protocol is http: or https:
// window.location.host is localhost:3000 or wheelshare-frontend.vercel.app
export const ionAuthorizationEndpoint = createIonAuthorizationEndpoint(
	getRedirectUrl('ion')
);
