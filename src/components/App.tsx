import WheelShare from './WheelShare';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Authenticator = lazy(() => import('./Authentication/Authenticator'));
const Group = lazy(() => import('./Group'));

const dev = true;
const ION_AUTHORIZATION_ENDPOINT = dev
	? 'https://ion.tjhsst.edu/oauth/authorize?response_type=code&client_id=rNa6n9YSg8ftINdyVPpUsaMuxNbHLo9dh1OsOktR&scope=read&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fion%2Fcallback'
	: 'https://ion.tjhsst.edu/oauth/authorize?response_type=code&client_id=rNa6n9YSg8ftINdyVPpUsaMuxNbHLo9dh1OsOktR&scope=read&redirect_uri=https%3A%2F%2Fwheelshare.space%2Fauth%2Fion%2Fcallback';

export default function App() {
	return (
		<>
			<a href={ION_AUTHORIZATION_ENDPOINT}>Login Link for Testing Oauth</a>
			<div style={{ padding: '1rem' }}>
				<BrowserRouter>
					<Switch>
						<Route path="/" exact component={WheelShare} />
						<Suspense fallback={null}>
							<Route path="/groups/:id" component={Group} />
							<Route
								component={Authenticator}
								path="/auth/:provider/callback"
							/>
						</Suspense>
					</Switch>
				</BrowserRouter>
			</div>
		</>
	);
}
