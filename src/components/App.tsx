import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthenticationContext from './Authentication/AuthenticationContext';
import WheelShare from './WheelShare';
import WheelShareLoggedOut from './WheelShareLoggedOut';

const Authenticator = lazy(() => import('./Authentication/Authenticator'));
const Group = lazy(() => import('./Group'));

export default function App() {
	const { user } = useContext(AuthenticationContext);
	return (
		<div style={{ padding: '1rem' }}>
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
