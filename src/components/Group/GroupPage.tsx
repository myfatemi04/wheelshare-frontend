import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getGroup, getGroupEvents } from '../api';
import { IGroup } from '../types';
import Group from './Group';

export default function GroupPage() {
	const { id } = useParams<{ id: string }>();
	const [loading, setLoading] = useState(true);
	const [group, setGroup] = useState<IGroup | null>(null);

	useEffect(() => {
		async function load() {
			setLoading(true);
			try {
				const group = await getGroup(+id);
				const events = await getGroupEvents(+id);

				setGroup({ ...group, events });
			} catch (e) {
				console.error(e);
				setGroup(null);
			}

			setLoading(false);
		}

		load();
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

	return <Group group={group} />;
}
