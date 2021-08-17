import { useMemo } from 'react';
import { createContext, useEffect, useState } from 'react';
import { getGroup } from '../api';
import EventCreatorLink from '../EventCreator/EventCreatorLink';
import EventStream from '../EventStream';
import { useMe } from '../hooks';
import { IGroup } from '../types';
import UILink from '../UI/UILink';
import UITwoColumns from '../UI/UITwoColumns';
import useImmutable from '../useImmutable';
import GroupMembersLink from './GroupMembersLink';
import GroupSettingsLink from './GroupSettingsLink';

const DEFAULT_GROUP = (): IGroup => ({
	id: 0,
	name: '',
	users: [],
	events: [],
	admins: [],
	joinCode: null,
});

export const GroupContext = createContext({ group: DEFAULT_GROUP() });

export default function Group({ id }: { id: number }) {
	const [group, setGroup] = useImmutable<IGroup | null>(null);
	const [loading, setLoading] = useState(false);
	const me = useMe();

	useEffect(() => {
		setLoading(true);
		getGroup(id)
			.then(setGroup)
			.catch(console.error) // TODO error handling
			.finally(() => setLoading(false));
	}, [id, setGroup]);

	const isAdmin = useMemo(() => {
		if (!group) {
			return false;
		}

		return group.admins.some((a) => a.id === me?.id);
	}, [group, me?.id]);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return group ? (
		<GroupContext.Provider value={{ group }}>
			<UITwoColumns
				first={
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							minWidth: '15rem',
						}}
					>
						<h1>{group.name}</h1>
						<UILink href="/">Home</UILink>
						<br />
						<GroupMembersLink />
						<br />
						{isAdmin && (
							<>
								<GroupSettingsLink />
								<br />
							</>
						)}
						<EventCreatorLink />
					</div>
				}
				firstFlex={1}
				second={
					group.events?.length > 0 ? (
						<EventStream events={group.events} />
					) : (
						<span>
							There are no events yet. Click 'create event' above to add one!
						</span>
					)
				}
				secondFlex={2}
			/>
		</GroupContext.Provider>
	) : (
		<h1>Group not found</h1>
	);
}
