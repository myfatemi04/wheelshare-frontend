import { CSSProperties, lazy, Suspense, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotificationsProvider from '../state/Notifications/NotificationsProvider';
import AuthenticationContext from './Authentication/AuthenticationContext';
import Header from './Header/Header';
import {
	hasLoginContinueURL,
	popLoginContinueURL,
	setLoginContinueURL,
} from './loginContinueUrl';
import WheelShare from './WheelShare';
import WheelShareLoggedOut from './WheelShareLoggedOut';

const Authenticator = lazy(() => import('./Authentication/Authenticator'));
const CarpoolPage = lazy(() => import('./Carpool/CarpoolPage'));
const EventPage = lazy(() => import('./Event/EventPage'));
const GroupPage = lazy(() => import('./Group/GroupPage'));

const style: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	// width: '30rem',
	maxWidth: '100%',
	marginLeft: 'auto',
	marginRight: 'auto',
};

export default function App() {
	const { user, loaded } = useContext(AuthenticationContext);

	useEffect(() => {
		if (!loaded) return;

		if (!user) {
			if (!window.location.pathname.startsWith('/auth/')) {
				setLoginContinueURL(window.location.href);
			}
		} else if (hasLoginContinueURL()) {
			window.location.href = popLoginContinueURL()!;
		}
	}, [loaded, user]);

	return (
		<div style={{ padding: '1rem', maxWidth: '100vw' }}>
			<div style={style}>
				<Suspense fallback={null}>
					<BrowserRouter>
						<Switch>
							{user ? (
								<NotificationsProvider>
									<Header />
									<Route path="/" exact component={WheelShare} />
									<Route path="/carpools/:id" component={CarpoolPage} />
									<Route path="/events/:id" component={EventPage} />
									<Route path="/groups/:id" component={GroupPage} />
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
