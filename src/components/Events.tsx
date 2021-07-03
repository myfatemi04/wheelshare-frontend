import { useEffect, useState } from 'react';
import { IEvent } from './Event';
import EventStream from './EventStream';

export default function Events() {
	const [events, setEvents] = useState<IEvent[]>([]);

	useEffect(() => {
		fetch('http://localhost:5000/api/events')
			.then((res) => res.json())
			.then(setEvents);
	}, []);

	return (
		<>
			<h1>Events</h1>
			<EventStream events={events} />
		</>
	);
}
