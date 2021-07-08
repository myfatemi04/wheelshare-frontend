import UILink from './UILink';
import UIPrimaryTitle from './UIPrimaryTitle';

function createAuthorizationEndpoint(redirectUrl: string) {
	const url = new URL('https://ion.tjhsst.edu/oauth/authorize');

	url.searchParams.set('response_type', 'code');
	url.searchParams.set('client_id', 'rNa6n9YSg8ftINdyVPpUsaMuxNbHLo9dh1OsOktR');
	url.searchParams.set('redirect_uri', redirectUrl);
	url.searchParams.set('scope', 'read');

	return url.toString();
}

const dev = true;
const endpoint = createAuthorizationEndpoint(
	dev
		? 'http://localhost:3000/auth/ion/callback'
		: 'https://wheelshare.space/auth/ion/callback'
);

export default function WheelShareLoggedOut() {
	return (
		<>
			<UIPrimaryTitle>WheelShare</UIPrimaryTitle>
			<p>To get started, log in with your Ion account.</p>
			<UILink href={endpoint}>Log in</UILink>
		</>
	);
}
