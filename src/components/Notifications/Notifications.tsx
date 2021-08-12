import Notification from './Notification';
import { IInvitation } from '../types';

export default function Notifications({
	notifications,
	refresh,
}: {
	notifications: IInvitation[];
	refresh: () => void;
}) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h3 style={{ marginBlockEnd: '0' }}>Notifications</h3>
			{notifications.map((notification) => (
				<Notification
					notification={notification}
					refresh={refresh}
					key={`${notification.user.id}:${notification.carpool.id}`}
				/>
			))}
		</div>
	);
}
