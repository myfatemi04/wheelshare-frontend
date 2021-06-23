import { IGroup } from './Group';
import UISecondaryBox from './UISecondaryBox';

function GroupListItem({ group }: { group: IGroup }) {
	return (
		<UISecondaryBox>
			<h2 style={{ textAlign: 'center' }}>{group.name}</h2>
		</UISecondaryBox>
	);
}

export default function GroupList({ groups }: { groups: IGroup[] }) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			{groups.map((group) => (
				<GroupListItem group={group} key={group.id} />
			))}
		</div>
	);
}
