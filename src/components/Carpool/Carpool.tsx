import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICarpool } from '../types';
import UISecondaryBox from '../UI/UISecondaryBox';
import MemberList from './MemberList';

export default function Carpool() {
	const id = +useParams<{ id: string }>().id;
	const [carpool, setCarpool] = useState<ICarpool | null>({
		id,
		name: 'carpoollo2398',
		eventId: 0,
		event: {
			id: 0,
			name: 'test event',
			latitude: 0,
			longitude: 0,
			formattedAddress: 'your house',
			placeId: 'secret',
		},
		members: [
			{
				id: 0,
				name: 'Joshua Hsueh',
			},
			{
				id: 1,
				name: 'Michael Fatemi',
			},
			{
				id: 2,
				name: 'Tom Brady',
			},
			{
				id: 3,
				name: 'Bob the Builder',
			},
		],
		invitations: [],
	});

	// useEffect(() => {
	// 	getCarpool(id).then(setCarpool);
	// }, [id]);

	const { event, name } = carpool!;

	return (
		<UISecondaryBox style={{ width: '100%', alignItems: 'center' }}>
			{carpool ? (
				<>
					<h1>{name}</h1>
					<h2>{event.name}</h2>
					<div style={{ fontSize: '1.5rem', fontWeight: 600 }}>
						<div
							style={{
								color: '#303030',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<LocationOnIcon style={{ marginRight: '1rem' }} />
							{event.formattedAddress}
						</div>
						<div
							style={{
								color: '#303030',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<EventIcon style={{ marginRight: '1rem' }} />
							DAWN - DUSK
						</div>
					</div>
					<h3>Members</h3>
					<MemberList members={carpool.members} />
				</>
			) : (
				<h2>Loading</h2>
			)}
		</UISecondaryBox>
	);
}
