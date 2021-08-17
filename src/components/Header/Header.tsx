import { ionAuthorizationEndpoint } from '../Authentication/authorizationEndpoint';
import logout from '../Authentication/logout';
import { useMe, useNotifications } from '../hooks';
import Notifications from '../Notifications/Notifications';
import UILink from '../UI/UILink';
import UIPressable from '../UI/UIPressable';
import UIPrimaryTitle from '../UI/UIPrimaryTitle';

export default function Header() {
	const me = useMe();
	const [notifications, refreshNotifications] = useNotifications();

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
					{me.email && ` (${me.email})`}
					<UIPressable onClick={logout}>Log out</UIPressable>
					<br />
					{notifications.length > 0 ? (
						<Notifications
							notifications={notifications}
							refresh={refreshNotifications}
						/>
					) : (
						<span>No notifications</span>
					)}
				</>
			) : (
				<UILink href={ionAuthorizationEndpoint}>Log in</UILink>
			)}
		</div>
	);
}
