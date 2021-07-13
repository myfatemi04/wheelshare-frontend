import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarpool } from '../api';
import { ICarpool } from '../types';
import { IUser } from '../types';
import UISecondaryBox from '../UI/UISecondaryBox';
import MemberList from './MemberList';

const dummyMemberData: IUser[] = [
	{
		id: 0,
		email: 'joshua12696@gmail.com',
		name: 'Joshua Hsueh',
	},
	{
		id: 1,
		email: 'myfatemi04@gmail.com',
		name: 'Michael Fatemi',
	},
	{
		id: 2,
		email: 'thegoat@gmail.com',
		name: 'Tom Brady',
	},
	{
		id: 3,
		email: 'bobbyshmurda@gmail.com',
		name: 'Bob the Builder',
	},
];

export default function Carpool() {
	const id = +useParams<{ id: string }>().id;
	const [carpool, setCarpool] = useState<ICarpool | null>(null);

	useEffect(() => {
		getCarpool(id).then(setCarpool);
	}, [id]);

	return (
		<UISecondaryBox style={{ width: '100%', alignItems: 'center' }}>
			<MemberList members={dummyMemberData} />
			{/* {carpool && (
				<>
					<h2 style={{ textAlign: 'center' }}>{carpool.name}</h2>
					{carpool.description}
				</>
			)} */}
		</UISecondaryBox>
	);
}
