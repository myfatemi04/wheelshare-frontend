import { CSSProperties, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GroupsProvider from '../state/GroupsProvider';
import NotificationsProvider from '../state/Notifications/NotificationsProvider';
import { useMe } from './hooks';
import useImmutable from './useImmutable';
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
	const [imm] = useImmutable({
		x: 0,
		y: 0,
		z: { a: 1, b: 2, c: [0, 1, 2] },
	});
	return (
		<NotificationsProvider>
			<GroupsProvider>
				<div style={{ padding: '1rem', maxWidth: '100vw' }}>
					<div style={style}>
						{JSON.stringify(imm)}
						{/* Reset button */}
						<button onClick={() => imm.z.a++}>Increment</button>
						<button onClick={() => imm.z.c.push(imm.z.c.length)}>Push</button>
						<BrowserRouter>
							<Switch>
								<Route
									path="/"
									exact
									component={user ? WheelShare : WheelShareLoggedOut}
								/>
								<Suspense fallback={null}>
									<Route
										component={Authenticator}
										path="/auth/:provider/callback"
									/>
									<Route path="/carpools/:id" component={CarpoolPage} />
									<Route path="/events/:id" component={EventPage} />
									<Route path="/groups/:id" component={Group} />
								</Suspense>
							</Switch>
						</BrowserRouter>
					</div>
				</div>
			</GroupsProvider>
		</NotificationsProvider>
	);
}
