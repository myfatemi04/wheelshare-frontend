import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarpool } from '../api';
import { ICarpool } from '../types';
import UISecondaryBox from '../UI/UISecondaryBox';

function MemberList({ members }: { members: ICarpool['members'] }) {
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

export default function Carpool() {
	const id = +useParams<{ id: string }>().id;
	const [carpool, setCarpool] = useState<ICarpool | null>(null);

	useEffect(() => {
		getCarpool(id).then(setCarpool);
	}, [id]);

	return (
		<UISecondaryBox style={{ width: '100%', alignItems: 'center' }}>
			{carpool && (
				<>
					<h2 style={{ textAlign: 'center' }}>{carpool.name}</h2>
					{carpool.description}
					<h3>Members</h3>
					<MemberList members={carpool.members} />
				</>
			)}
		</UISecondaryBox>
	);
}
