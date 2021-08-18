import {
	googleAuthorizationEndpoint,
	ionAuthorizationEndpoint,
} from './Authentication/authorizationEndpoint';
import UILink from './UI/UILink';
import UIPrimaryTitle from './UI/UIPrimaryTitle';

export default function WheelShareLoggedOut() {
	return (
		<>
			<UIPrimaryTitle>WheelShare</UIPrimaryTitle>
			<p>To get started, log in with your Ion account.</p>
			<UILink href={ionAuthorizationEndpoint}>Log in with Ion</UILink>
			<br />
			<UILink href={googleAuthorizationEndpoint}>Log in with Google</UILink>
			<br />
			<p>
				If you're new to Ion, follow{' '}
				<a href="https://guides.tjhsst.edu/ion/resetting-your-ion-password">
					this guide
				</a>{' '}
				to create an account and reset your password
			</p>
		</>
	);
}
