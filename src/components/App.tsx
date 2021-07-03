import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthenticationContext from './Authentication/AuthenticationContext';
import logout from './Authentication/logout';
import UIButton from './UIButton';
import WheelShare from './WheelShare';

const Authenticator = lazy(() => import('./Authentication/Authenticator'));
const Group = lazy(() => import('./Group'));

const dev = true;
const ION_AUTHORIZATION_ENDPOINT = dev
	? 'https://ion.tjhsst.edu/oauth/authorize?response_type=code&client_id=rNa6n9YSg8ftINdyVPpUsaMuxNbHLo9dh1OsOktR&scope=read&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fion%2Fcallback'
	: 'https://ion.tjhsst.edu/oauth/authorize?response_type=code&client_id=rNa6n9YSg8ftINdyVPpUsaMuxNbHLo9dh1OsOktR&scope=read&redirect_uri=https%3A%2F%2Fwheelshare.space%2Fauth%2Fion%2Fcallback';

export default function App() {
	const { isLoggedIn, user } = useContext(AuthenticationContext);
	return (
		<div style={{ padding: '1rem' }}>
			{isLoggedIn ? (
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						backgroundColor: '#f6f6f6',
						borderRadius: '0.5rem',
						padding: '1rem',
						alignItems: 'center',
					}}
				>
					{user!.name}{' '}
					<UIButton style={{ marginTop: 0 }} onClick={logout}>
						Log out
					</UIButton>
				</div>
			) : (
				<a href={ION_AUTHORIZATION_ENDPOINT}>Log in</a>
			)}
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={WheelShare} />
					<Suspense fallback={null}>
						<Route path="/groups/:id" component={Group} />
						<Route component={Authenticator} path="/auth/:provider/callback" />
					</Suspense>
				</Switch>
			</BrowserRouter>
		</div>
	);
}
