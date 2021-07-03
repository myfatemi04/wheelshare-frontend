import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getGroup, getGroupEvents } from './api';
import { IEvent } from './Event';
import EventCreatorLink from './EventCreatorLink';
import EventStream from './EventStream';
import GroupSettingsLink from './GroupSettingsLink';
import UILink from './UILink';

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
		getGroup(+id)
			.then(setGroup)
			.finally(() => setLoading(false));

		getGroupEvents(+id).then(setEvents);
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
			<UILink href="/">Home</UILink>
			<br />
			<br />
			<GroupSettingsLink group={group} />
			<br />
			<EventCreatorLink group={group} />
			<br />
			{events && events.length > 0 ? (
				<EventStream events={events} />
			) : (
				<span>
					There are no events yet. Click 'create event' above to add one!
				</span>
			)}
		</div>
	);
}
