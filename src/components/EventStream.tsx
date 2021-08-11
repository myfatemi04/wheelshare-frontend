import Event from './Event/Event';
import { IEvent } from './types';

export default function EventStream({ events }: { events: IEvent[] }) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{events.map((event) => (
				<Event id={event.id} initial={event} key={event.name} />
			))}
		</div>
	);
}
