function createAuthorizationEndpoint(redirectUrl: string) {
	const url = new URL('https://ion.tjhsst.edu/oauth/authorize');

	url.searchParams.set('response_type', 'code');
	url.searchParams.set('client_id', 'rNa6n9YSg8ftINdyVPpUsaMuxNbHLo9dh1OsOktR');
	url.searchParams.set('redirect_uri', redirectUrl);
	url.searchParams.set('scope', 'read');

	return url.toString();
}

const redirectUrl = `${window.location.protocol}://${window.location.host}/auth/ion/callback`;
const authorizationEndpoint = createAuthorizationEndpoint(redirectUrl);

export default authorizationEndpoint;
