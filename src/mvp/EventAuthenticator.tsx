import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import EventPage from './EventPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import WheelShareContext from './WheelShareContext';

const useAuthenticated = () => {
	const { authenticated } = useContext(WheelShareContext);

	return authenticated;
};

const eventUrl = window.location.pathname.slice(1);

export default function EventAuthenticator() {
	const authenticated = useAuthenticated();
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchName() {
			const res = await fetch(`//localhost:5000/events/${eventUrl}/preview`);
			if (res.status === 200) {
				const json = await res.json();
				setName(json.data.event.name);
			} else {
				setName('');
			}
		}

		fetchName().finally(() => setLoading(false));
	}, []);

	const hasEvent = !!useContext(WheelShareContext).event;

	if (!name && !loading) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					maxWidth: 'min(100vw, 30rem)',
					margin: '0 auto',
				}}
			>
				<h1 style={{ textAlign: 'center' }}>Event not found</h1>
			</div>
		);
	}

	if (!authenticated) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					maxWidth: 'min(100vw, 30rem)',
					margin: '0 auto',
				}}
			>
				<h1 style={{ textAlign: 'center' }}>{name}</h1>
				<SignIn />
				<SignUp />
			</div>
		);
	}

	if (!hasEvent) {
		return null;
	}

	return <EventPage />;
}
