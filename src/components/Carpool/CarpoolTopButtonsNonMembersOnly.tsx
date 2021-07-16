import { useCallback, useContext } from 'react';
import { lightgrey } from '../../lib/colors';
import { useInvitationState } from '../../state/Notifications/NotificationsHooks';
import { NotificationsContext } from '../../state/Notifications/NotificationsProvider';
import { useMe } from '../hooks';
import UIButton from '../UI/UIButton';
import { CarpoolContext } from './Carpool';

const defaultMe = { id: 0, name: '' };
const greyButtonStyle = {
	backgroundColor: lightgrey,
	flex: 1,
	margin: '0.5rem',
};

export default function CarpoolTopButtonsNonMembersOnly() {
	const { carpool } = useContext(CarpoolContext);
	const members = carpool.members;

	const {
		sendCarpoolRequest,
		cancelCarpoolRequest,
		acceptCarpoolInvite,
		denyCarpoolInvite,
	} = useContext(NotificationsContext);

	const me = useMe() || defaultMe;

	const sendRequest = useCallback(() => {
		sendCarpoolRequest(carpool.id);
	}, [carpool.id, sendCarpoolRequest]);

	const cancelRequest = useCallback(() => {
		cancelCarpoolRequest(carpool.id);
	}, [carpool.id, cancelCarpoolRequest]);

	const acceptInvitation = useCallback(() => {
		acceptCarpoolInvite(carpool.id).then(() => {
			members.push(me);
		});
	}, [acceptCarpoolInvite, carpool.id, members, me]);

	const denyInvitation = useCallback(() => {
		denyCarpoolInvite(carpool.id).then(() => {
			members.push(me);
		});
	}, [carpool.id, denyCarpoolInvite, me, members]);

	const invitationState = useInvitationState(carpool.id);
	return (
		<>
			{invitationState === 'requested' ? (
				<UIButton
					style={{ backgroundColor: lightgrey, margin: '0.5rem' }}
					onClick={cancelRequest}
				>
					Cancel request to join
				</UIButton>
			) : invitationState === 'none' ? (
				<UIButton
					style={{ backgroundColor: lightgrey, margin: '0.5rem' }}
					onClick={sendRequest}
				>
					Request to join
				</UIButton>
			) : (
				<>
					<span style={{ marginTop: '0.5rem' }}>
						You've been invited to this carpool!
					</span>
					<div
						style={{
							display: 'flex',
							width: '100%',
							textAlign: 'center',
							margin: '0.5rem 0',
						}}
					>
						<UIButton onClick={acceptInvitation} style={greyButtonStyle}>
							Accept
						</UIButton>
						<UIButton onClick={denyInvitation} style={greyButtonStyle}>
							Decline
						</UIButton>
					</div>
				</>
			)}
		</>
	);
}
