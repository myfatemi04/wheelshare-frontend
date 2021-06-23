import WheelShare from './WheelShare';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Group = lazy(() => import('./Group'));

export default function App() {
	return (
		<div style={{ padding: '1rem' }}>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={WheelShare} />
					<Suspense fallback={null}>
						<Route path="/groups/:id" component={Group} />
					</Suspense>
				</Switch>
			</BrowserRouter>
		</div>
	);
}
