import { useEffect, useState } from 'react';
import { getGroups } from './api';
import { IGroup } from './Group';
import GroupCreatorLink from './GroupCreatorLink';
import GroupJoinerLink from './GroupJoinerLink';
import GroupList from './GroupList';
import Notifications, { INotification } from './Notifications';

const dummyNotificationData: INotification[] = [
	{
		user: {
			id: 0,
			name: 'Michael Fatemi',
		},
		carpool: {
			id: 0,
			name: 'Cross Country',
		},
		isRequest: true,
		sentTime: new Date(),
	},
	{
		user: {
			id: 1,
			name: 'Joshua Hsueh',
		},
		carpool: {
			id: 0,
			name: 'TJ Lax',
		},
		isRequest: false,
		sentTime: new Date(),
	},
];

export default function Groups() {
	const [groups, setGroups] = useState<IGroup[]>([]);
	// eslint-disable-next-line
	const [notifications, setNotifications] = useState(dummyNotificationData);
	useEffect(() => {
		getGroups().then(setGroups);
		//getNotifications().then(setNotifications);
	}, []);

	return (
		<>
			{notifications.length > 0 ? (
				<Notifications notifications={notifications} />
			) : (
				<span>No notifications </span>
			)}
			<h1>Groups</h1>
			<GroupJoinerLink />
			<br />
			<GroupCreatorLink />
			<br />
			{groups.length > 0 ? (
				<GroupList groups={groups} />
			) : (
				<span>
					You aren't in any groups. You can create your own by clicking 'create
					group' above, or join one by asking an admin of the group to send you
					an invite link.
				</span>
			)}
		</>
	);
}
