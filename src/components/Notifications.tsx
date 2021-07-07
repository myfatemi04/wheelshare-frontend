import Notification from './Notification';
import { IInvitation } from './types';

export default function Notifications({
	notifications,
}: {
	notifications: IInvitation[];
}) {
	return (
		<div className="notifications">
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h3 style={{ marginBlockEnd: '0' }}>Notifications</h3>
				{notifications.map((notification) => {
					return <Notification notification={notification} />;
				})}
			</div>
		</div>
	);
}
