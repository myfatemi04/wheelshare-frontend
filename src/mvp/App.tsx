import EventAuthenticator from './EventAuthenticator';
import PlanEvent from './PlanEvent';

function Home() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<h1
				style={{
					fontSize: '2rem',
				}}
			>
				WheelShare
			</h1>
			<PlanEvent />
		</div>
	);
}

export default function App() {
	if (window.location.pathname === '/') {
		return <Home />;
	} else {
		// const eventName = window.location.pathname.slice(1);

		return <EventAuthenticator />;
	}
}
