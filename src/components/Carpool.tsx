import { ICarpool, IUser } from './types';
import UISecondaryBox from './UISecondaryBox';

function MemberList({ members }: { members: IUser[] }) {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{members.length > 0
				? members.map((member) => {
						return <div key={member.id}>{member.name}</div>;
				  })
				: 'This carpool has no members.'}
		</div>
	);
}

export default function Carpool({ carpool }: { carpool: ICarpool }) {
	return (
		<UISecondaryBox style={{ width: '100%', alignItems: 'center' }}>
			<h2 style={{ textAlign: 'center' }}>{carpool.name}</h2>
			{carpool.description}
			<h3>Members</h3>
			<MemberList members={carpool.members} />
		</UISecondaryBox>
	);
}
