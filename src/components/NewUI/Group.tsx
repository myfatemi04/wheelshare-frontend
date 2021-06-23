import { IEvent } from './Event';
import EventCreator from './EventCreator';
import EventStream from './EventStream';

export type IGroup = {
	id: number;
	events: IEvent[];
	name: string;
};

export default function Group({ events, name }: IGroup) {
	return (
		<div style={{ textAlign: 'center', width: '100%' }}>
			<EventCreator />
			<h1>{name}</h1>
			<EventStream events={events} />
		</div>
	);
	//
}
