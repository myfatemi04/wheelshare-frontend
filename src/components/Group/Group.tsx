import { createContext, useEffect } from 'react';
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
	const [group, setGroup] = useImmutable<IGroup>(DEFAULT_GROUP());

	useEffect(() => {
		getGroup(id).then(setGroup);
	}, [id, setGroup]);

	return (
		<GroupContext.Provider value={{ group }}>
			<div
				style={{
					textAlign: 'center',
					maxWidth: '30rem',
					marginLeft: 'auto',
					marginRight: 'auto',
				}}
			>
				<h1>{group.name}</h1>
				<UILink href="/">Home</UILink>
				<br />
				<br />
				<GroupMembersLink />
				<br />
				<GroupSettingsLink />
				<br />
				<EventCreatorLink />
				<br />

				{group.events.length > 0 ? (
					<EventStream events={group.events} />
				) : (
					<span>
						There are no events yet. Click 'create event' above to add one!
					</span>
				)}
			</div>
		</GroupContext.Provider>
	);
}
