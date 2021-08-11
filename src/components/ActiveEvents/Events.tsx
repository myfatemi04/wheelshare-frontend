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
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h1 style={{ textAlign: 'center' }}>Events</h1>
			<EventStream events={events} />
		</div>
	);
}
