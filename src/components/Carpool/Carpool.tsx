import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ICarpool } from '../types';

import UISecondaryBox from '../UI/UISecondaryBox';
import UIButton from '../UI/UIButton';
import { lightgrey } from '../colors';

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
		members: [],
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
					<h1 style={{ marginBottom: '0rem' }}>{name}</h1>
					<h2 style={{ marginBottom: '0rem' }}>{event.name}</h2>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							margin: '0.5rem 0',
						}}
					>
						<UIButton
							style={{
								marginRight: '0.25rem',
								backgroundColor: lightgrey,
								display: 'flex',
								alignItems: 'center',
							}}
							onClick={console.log}
						>
							<MailOutlineIcon style={{ marginRight: '0.5rem' }} /> 1 request
						</UIButton>
						<UIButton
							style={{
								marginLeft: '0.25rem',
								backgroundColor: lightgrey,
								display: 'flex',
								alignItems: 'center',
							}}
							onClick={console.log}
						>
							<PersonAddIcon style={{ marginRight: '0.5rem' }} /> Invite
						</UIButton>
					</div>
					<div style={{ fontSize: '1.5rem', fontWeight: 400 }}>
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
