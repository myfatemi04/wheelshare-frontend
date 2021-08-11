import { IGroup } from '../types';
import UILink from '../UI/UILink';
import UISecondaryBox from '../UI/UISecondaryBox';

function GroupListItem({ group }: { group: IGroup }) {
	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<span
				style={{
					fontSize: '1.5rem',
					fontWeight: 'bold',
					display: 'block',
					marginTop: '1rem',
					marginBottom: '1rem',
					marginRight: '2rem',
				}}
			>
				{group.name}
			</span>
			<UILink href={`/groups/${group.id}`}>View group</UILink>
		</div>
	);
}

export default function GroupList({ groups }: { groups: IGroup[] }) {
	return (
		<UISecondaryBox
			style={{
				width: '100%',
				boxSizing: 'border-box',
				alignItems: 'center',
			}}
		>
			{groups.map((group) => (
				<GroupListItem group={group} key={group.id} />
			))}
		</UISecondaryBox>
	);
}
