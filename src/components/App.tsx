import { lazy, Suspense, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthenticationContext from './Authentication/AuthenticationContext';
import WheelShare from './WheelShare';
import WheelShareLoggedOut from './WheelShareLoggedOut';
import { INotification } from './Notifications';
import Notifications from './Notifications';

const Authenticator = lazy(() => import('./Authentication/Authenticator'));
const Group = lazy(() => import('./Group'));

const dummyNotificationData: INotification[] = ([] = [
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
]);

export default function App() {
	const { user } = useContext(AuthenticationContext);
	const [notifications, setNotifications] = useState(dummyNotificationData);
	useEffect(() => {
		//getNotifications().then(setNotifications);
	}, []);
	return (
		<div style={{ padding: '1rem' }}>
			{notifications.length > 0 ? (
				<Notifications notifications={notifications} />
			) : (
				<span>No notifications </span>
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
						<Route component={Authenticator} path="/auth/:provider/callback" />
					</Suspense>
				</Switch>
			</BrowserRouter>
		</div>
	);
}
