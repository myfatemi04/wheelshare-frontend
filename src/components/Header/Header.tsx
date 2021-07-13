import logout from '../Authentication/logout';
import { useMe, useNotifications } from '../hooks';
import Notifications from '../Notifications/Notifications';
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
			<UIPrimaryTitle>WheelShare</UIPrimaryTitle>
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
				<span>Log In</span>
			)}
		</div>
	);
}
