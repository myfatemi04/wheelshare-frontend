import Event, { IEvent } from './Event';

export default function EventStream({ events }: { events: IEvent[] }) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			{events && events.length > 0 ? (
				events.map((event) => <Event {...event} key={event.title} />)
			) : (
				<span>
					There are no events yet. Click 'create event' above to add one!
				</span>
			)}
		</div>
	);
}
