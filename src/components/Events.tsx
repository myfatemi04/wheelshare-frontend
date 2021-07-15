import { useEffect } from 'react';
import { getEvents } from './api';
import { IEvent } from './types';
import EventStream from './EventStream';
import useImmutable from './useImmutable';

export default function Events() {
	const [events, setEvents] = useImmutable<IEvent[]>([]);

	const hasEvents = events.length > 0;

	useEffect(() => {
		if (!hasEvents) {
			getEvents().then(setEvents);
		}
	}, [hasEvents, setEvents]);

	return (
		<>
			<h1>Events</h1>
			<EventStream events={events} />
		</>
	);
}
