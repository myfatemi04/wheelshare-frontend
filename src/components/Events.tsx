import { useEffect, useState } from 'react';
import { getEvents } from './api';
import { IEvent } from './Event';
import EventStream from './EventStream';

export default function Events() {
	const [events, setEvents] = useState<IEvent[]>([]);

	useEffect(() => {
		getEvents().then(setEvents);
	}, []);

	return (
		<>
			<h1>Events</h1>
			<EventStream events={events} />
		</>
	);
}
