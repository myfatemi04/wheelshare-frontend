import { lightgrey } from '../colors';
import UIButton from '../UI/UIButton';
import InvitationList from './InvitationList';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import useToggle from '../useToggle';

export default function InvitationsAndRequests() {
	const [invitationsOpen, toggleInvitationsOpen] = useToggle(false);

	return (
		<>
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
		</>
	);
}
