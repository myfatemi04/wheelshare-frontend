import { CSSProperties, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useMe } from './hooks';
import WheelShare from './WheelShare';
import WheelShareLoggedOut from './WheelShareLoggedOut';

const Authenticator = lazy(() => import('./Authentication/Authenticator'));
const Carpool = lazy(() => import('./Carpool/Carpool'));
const Group = lazy(() => import('./Group'));

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
