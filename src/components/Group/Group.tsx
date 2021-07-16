import { createContext, useEffect, useState } from 'react';
import { getGroup } from '../api';
import EventCreatorLink from '../EventCreator/EventCreatorLink';
import EventStream from '../EventStream';
import { IGroup } from '../types';
import UILink from '../UI/UILink';
import useImmutable from '../useImmutable';
import GroupMembersLink from './GroupMembersLink';
import GroupSettingsLink from './GroupSettingsLink';

const DEFAULT_GROUP = (): IGroup => ({
	id: 0,
	name: '',
	users: [],
	events: [],
	joinCode: null,
});

export const GroupContext = createContext({ group: DEFAULT_GROUP() });

export default function Group({ id }: { id: number }) {
	const [group, setGroup] = useImmutable<IGroup | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getGroup(id)
			.then(setGroup)
			.finally(() => setLoading(false));
	}, [id, setGroup]);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return group ? (
		<GroupContext.Provider value={{ group }}>
			<h1>{group.name}</h1>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					alignItems: 'center',
				}}
			>
				<UILink href="/">Home</UILink>
				<br />
				<GroupMembersLink />
				<br />
				<GroupSettingsLink />
				<br />
				<EventCreatorLink />
			</div>
			<br />

			{group.events?.length > 0 ? (
				<EventStream events={group.events} />
			) : (
				<span>
					There are no events yet. Click 'create event' above to add one!
				</span>
			)}
		</GroupContext.Provider>
	) : (
		<h1>Group not found</h1>
	);
}
