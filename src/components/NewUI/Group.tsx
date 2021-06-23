import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IEvent } from './Event';
import EventCreatorLink from './EventCreatorLink';
import EventStream from './EventStream';
import GroupSettingsLink from './GroupSettingsLink';

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

	console.log({ events });

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
			<GroupSettingsLink group={group} />
			<EventCreatorLink group={group} />
			<EventStream events={events} />
		</div>
	);
}
