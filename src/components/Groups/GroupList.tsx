import { IGroup } from '../types';
import UILink from '../UI/UILink';
import UISecondaryBox from '../UI/UISecondaryBox';

function GroupListItem({ group }: { group: IGroup }) {
	return (
		<div>
			<h4>{group.name}</h4>
			<UILink href={`/groups/${group.id}`}>View group</UILink>
		</div>
	);
}

export default function GroupList({ groups }: { groups: IGroup[] }) {
	return (
		<UISecondaryBox style={{ width: '100%' }}>
			{groups.map((group) => (
				<GroupListItem group={group} key={group.id} />
			))}
		</UISecondaryBox>
	);
}
