import { useEffect } from 'react';
import { getActiveEvents } from '../api';
import EventStream from '../EventStream';
import { IEvent } from '../types';
import useImmutable from '../useImmutable';

export default function ActiveEvents() {
	const [events, setEvents] = useImmutable<IEvent[]>([]);

	const hasEvents = events.length > 0;

	useEffect(() => {
		if (!hasEvents) {
			getActiveEvents().then(setEvents);
		}
	}, [hasEvents, setEvents]);

	return (
		<>
			<h1>Events</h1>
			<EventStream events={events} />
		</>
	);
}
