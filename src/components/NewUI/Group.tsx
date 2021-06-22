import Event, { IEvent } from './Event';

export type IGroup = {
	events: IEvent[];
	name: string;
};

export default function Group({ events, name }: IGroup) {
	return (
		<div style={{ textAlign: 'center' }}>
			<h1>{name}</h1>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{events.map((event) => (
					<Event {...event} key={event.title} />
				))}
			</div>
		</div>
	);
	//
}
