import { CSSProperties, lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getReceivedInvitationsAndRequests } from './api';
import { useMe } from './hooks';
import Notifications from './Notifications/Notifications';
import { IInvitation } from './types';
import WheelShare from './WheelShare';
import WheelShareLoggedOut from './WheelShareLoggedOut';

const Authenticator = lazy(() => import('./Authentication/Authenticator'));
const Carpool = lazy(() => import('./Carpool/Carpool'));
const Group = lazy(() => import('./Group'));

const dummyNotificationData: IInvitation[] = [
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
		sentTime: new Date().toISOString(),
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
		sentTime: new Date().toISOString(),
	},
];

const style: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '30rem',
	maxWidth: '100%',
	marginLeft: 'auto',
	marginRight: 'auto',
};

function useNotifications() {
	const [notifications, setNotifications] = useState(dummyNotificationData);

	useEffect(() => {
		getReceivedInvitationsAndRequests().then(setNotifications);
	}, []);

	return notifications;
}

export default function App() {
	const user = useMe();
	const notifications = useNotifications();
	return (
		<div style={{ padding: '1rem', maxWidth: '100vw' }}>
			<div style={style}>
				{notifications.length > 0 ? (
					<Notifications notifications={notifications} />
				) : (
					<span>No notifications</span>
				)}
				<BrowserRouter>
					<Switch>
						<Route
							path="/"
							exact
							component={user ? WheelShare : WheelShareLoggedOut}
						/>
						<Suspense fallback={null}>
							<Route path="/groups/:id" component={Group} />
							<Route
								component={Authenticator}
								path="/auth/:provider/callback"
							/>
							<Route path="/carpools/:id" component={Carpool} />
						</Suspense>
					</Switch>
				</BrowserRouter>
			</div>
		</div>
	);
}
