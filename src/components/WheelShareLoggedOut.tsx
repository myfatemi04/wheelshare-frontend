import authorizationEndpoint from './Authentication/authorizationEndpoint';
import UILink from './UILink';
import UIPrimaryTitle from './UIPrimaryTitle';

export default function WheelShareLoggedOut() {
	return (
		<>
			<UIPrimaryTitle>WheelShare</UIPrimaryTitle>
			<p>To get started, log in with your Ion account.</p>
			<UILink href={authorizationEndpoint}>Log in</UILink>
		</>
	);
}
