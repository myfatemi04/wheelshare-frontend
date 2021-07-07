import { userInfo } from 'node:os';
import Notification from './Notification';

export type INotification = {
	user: {
		id: number;
		name: string;
	};
	carpool: {
		id: number;
		name: string;
	};
	isRequest: boolean;
	sentTime: Date;
};

export default function Notifications({
	notifications,
}: {
	notifications: INotification[];
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
