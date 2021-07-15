import EventCreatorLink from '../EventCreator/EventCreatorLink';
import EventStream from '../EventStream';
import GroupSettingsLink from './GroupSettingsLink';
import { IGroup } from '../types';
import UILink from '../UI/UILink';
import GroupMembersLink from './GroupMembersLink';

export default function Group({ group }: { group: IGroup }) {
	return (
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
			<GroupMembersLink group={group} />
			<br />
			<GroupSettingsLink group={group} />
			<br />
			<EventCreatorLink group={group} />
			<br />

			{group.events.length > 0 ? (
				<EventStream events={group.events} />
			) : (
				<span>
					There are no events yet. Click 'create event' above to add one!
				</span>
			)}
		</div>
	);
}
