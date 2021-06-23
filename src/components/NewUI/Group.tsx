import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IEvent } from './Event';
import EventCreator from './EventCreator';
import EventStream from './EventStream';

export type IGroup = {
	id: number;
	events: IEvent[];
	name: string;
};

export default function Group() {
	const { id } = useParams<{ id: string }>();
	const [loading, setLoading] = useState(true);
	const [group, setGroup] = useState<IGroup | null>(null);
	const [events, setEvents] = useState<IEvent[]>([]);

	useEffect(() => {
		setLoading(true);
		fetch('http://localhost:5000/api/groups/' + id)
			.then((response) => response.json())
			.then(setGroup)
			.finally(() => setLoading(false));

		fetch('http://localhost:5000/api/groups/' + id + '/events')
			.then((response) => response.json())
			.then(setEvents);
	}, [id]);

	if (!group && !loading) {
		return (
			<div style={{ textAlign: 'center' }}>
				<h1>Group Not Found</h1>
				<Link to="/">Home</Link>
			</div>
		);
	}

	if (!group) {
		return null;
	}

	const { name } = group;

	return (
		<div
			style={{
				textAlign: 'center',
				maxWidth: '30rem',
				marginLeft: 'auto',
				marginRight: 'auto',
			}}
		>
			<h1>{name}</h1>
			<EventCreator group={group} />
			<EventStream events={events} />
		</div>
	);
}
