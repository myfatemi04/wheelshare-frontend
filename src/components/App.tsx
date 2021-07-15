import { CSSProperties, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotificationsProvider from '../state/Notifications/NotificationsProvider';
import { useMe } from './hooks';
import WheelShare from './WheelShare';
import WheelShareLoggedOut from './WheelShareLoggedOut';

const Authenticator = lazy(() => import('./Authentication/Authenticator'));
const CarpoolPage = lazy(() => import('./Carpool/CarpoolPage'));
const EventPage = lazy(() => import('./Event/EventPage'));
const Group = lazy(() => import('./Group/GroupPage'));

const style: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '30rem',
	maxWidth: '100%',
	marginLeft: 'auto',
	marginRight: 'auto',
};

export default function App() {
	const user = useMe();

	return (
		<div style={{ padding: '1rem', maxWidth: '100vw' }}>
			<div style={style}>
				<Suspense fallback={null}>
					<BrowserRouter>
						<Switch>
							{user ? (
								<NotificationsProvider>
									<Route path="/" exact component={WheelShare} />
									<Route
										component={Authenticator}
										path="/auth/:provider/callback"
									/>
									<Route path="/carpools/:id" component={CarpoolPage} />
									<Route path="/events/:id" component={EventPage} />
									<Route path="/groups/:id" component={Group} />
								</NotificationsProvider>
							) : (
								<>
									<WheelShareLoggedOut />
									<Route
										component={Authenticator}
										path="/auth/:provider/callback"
									/>
								</>
							)}
						</Switch>
					</BrowserRouter>
				</Suspense>
			</div>
		</div>
	);
}
