import authorizationEndpoint from '../Authentication/authorizationEndpoint';
import logout from '../Authentication/logout';
import { useMe, useNotifications } from '../hooks';
import Notifications from '../Notifications/Notifications';
import UILink from '../UI/UILink';
import UIPressable from '../UI/UIPressable';
import UIPrimaryTitle from '../UI/UIPrimaryTitle';

export default function Header() {
	const me = useMe();
	const notifications = useNotifications();

	return (
		<div
			style={{
				marginBottom: '0.5rem',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<UIPrimaryTitle
				style={{ cursor: 'pointer' }}
				onClick={() => (window.location.href = '/')}
			>
				WheelShare
			</UIPrimaryTitle>
			{me ? (
				<>
					{me.name}
					<UIPressable onClick={logout}>Log out</UIPressable>
					<br />
					{notifications.length > 0 ? (
						<Notifications notifications={notifications} />
					) : (
						<span>No notifications</span>
					)}
				</>
			) : (
				<UILink href={authorizationEndpoint}>Log in</UILink>
			)}
		</div>
	);
}
