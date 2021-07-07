import Event, { IEvent } from './Event';

export default function EventStream({ events }: { events: IEvent[] }) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			{events.map((event) => (
				<Event event={event} key={event.name} />
			))}
		</div>
	);
}