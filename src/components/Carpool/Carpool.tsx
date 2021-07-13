import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ICarpool } from '../types';

import UISecondaryBox from '../UI/UISecondaryBox';
import MemberList from './MemberList';
import InvitationList from './InvitationList';
import UIButton from '../UI/UIButton';
import { lightgrey } from '../colors';
import { getCarpool } from '../api';
import useToggle from '../useToggle';

export default function Carpool() {
	const id = +useParams<{ id: string }>().id;
	const [carpool, setCarpool] = useState<ICarpool | null>(null);

	useEffect(() => {
		getCarpool(id).then(setCarpool);
	}, [id]);

	const [invitationsOpen, toggleInvitationsOpen] = useToggle(false);

	return (
		<UISecondaryBox style={{ width: '100%', alignItems: 'center' }}>
			{carpool ? (
				<>
					<h1 style={{ marginBottom: '0rem' }}>{carpool.name}</h1>
					<h2 style={{ marginBottom: '0rem' }}>{carpool.event.name}</h2>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							margin: '0.5rem 0',
						}}
					>
						{/* Requests */}
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
						{/* Invitations */}
						<UIButton
							style={{
								marginLeft: '0.25rem',
								backgroundColor: lightgrey,
								display: 'flex',
								alignItems: 'center',
							}}
							onClick={toggleInvitationsOpen}
						>
							<PersonAddIcon style={{ marginRight: '0.5rem' }} /> Invite
						</UIButton>
					</div>
					{invitationsOpen && <InvitationList carpool={carpool} />}
					<div style={{ fontSize: '1.5rem', fontWeight: 400 }}>
						<div
							style={{
								color: '#303030',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<LocationOnIcon style={{ marginRight: '1rem' }} />
							{carpool.event.formattedAddress}
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
					<MemberList members={carpool.members} />
				</>
			) : (
				<h2>Loading</h2>
			)}
		</UISecondaryBox>
	);
}