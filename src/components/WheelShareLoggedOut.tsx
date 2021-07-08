import authorizationEndpoint from './Authentication/authorizationEndpoint';
import UILink from './UI/UILink';
import UIPrimaryTitle from './UI/UIPrimaryTitle';

export default function WheelShareLoggedOut() {
	return (
		<>
			<UIPrimaryTitle>WheelShare</UIPrimaryTitle>
			<p>To get started, log in with your Ion account.</p>
			<UILink href={authorizationEndpoint}>Log in</UILink>
		</>
	);
}
