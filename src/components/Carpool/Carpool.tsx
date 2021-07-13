import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { createContext } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cancelCarpoolInvite, getCarpool, sendCarpoolInvite } from '../api';
import { lightgrey } from '../colors';
import { ICarpool } from '../types';
import UIButton from '../UI/UIButton';
import UISecondaryBox from '../UI/UISecondaryBox';
import useToggle from '../useToggle';
import CarpoolDetails from './CarpoolDetails';
import InvitationList from './InvitationList';
import MemberList from './MemberList';

export const CarpoolContext = createContext({
	carpool: null! as ICarpool,
	sendInvite: (user: { id: number; name: string }) => {
		console.error('not implemented: sendInvite');
	},
	cancelInvite: (user: { id: number; name: string }) => {
		console.error('not implemented: cancelInvite');
	},
});

export default function Carpool() {
	const id = +useParams<{ id: string }>().id;
	const [carpool, setCarpool] = useState<ICarpool | null>(null);

	useEffect(() => {
		getCarpool(id).then(setCarpool);
	}, [id]);

	const [invitationsOpen, toggleInvitationsOpen] = useToggle(false);

	const sendInvite = useCallback(
		(user: { id: number; name: string }) => {
			if (carpool) {
				sendCarpoolInvite(id, user.id)
					.then(() => {
						setCarpool(
							(carpool) =>
								carpool && {
									...carpool,
									invitations: [
										...carpool.invitations,
										{ isRequest: false, user },
									],
								}
						);
					})
					.catch(console.error);
			} else {
				console.error(
					'Trying to send invite when carpool has not been loaded.'
				);
			}
		},
		[carpool, id]
	);

	const cancelInvite = useCallback(
		(user: { id: number; name: string }) => {
			cancelCarpoolInvite(id, user.id)
				.then(() => {
					setCarpool(
						(carpool) =>
							carpool && {
								...carpool,
								invitations: carpool.invitations.filter(
									(invite) => invite.user.id !== user.id
								),
							}
					);
				})
				.catch(console.error);
		},
		[id]
	);

	if (!carpool) {
		return <>Loading...</>;
	}

	return (
		<CarpoolContext.Provider value={{ carpool, sendInvite, cancelInvite }}>
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
						{invitationsOpen && <InvitationList />}
						<CarpoolDetails carpool={carpool} />
						<MemberList members={carpool.members} />
					</>
				) : (
					<h2>Loading</h2>
				)}
			</UISecondaryBox>
		</CarpoolContext.Provider>
	);
}
