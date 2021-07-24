import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import { useContext } from 'react';
import useToggle from '../useToggle';
import { CarpoolContext } from './Carpool';
import InvitationList from './InvitationList';
import RequestList from './RequestList';

const spanStyle = {
	padding: '0.5rem',
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer',
	userSelect: 'none',
} as const;

export default function CarpoolTopButtonsMembersOnly() {
	const [invitationsOpen, toggleInvitationsOpen] = useToggle(false);
	const [requestsOpen, toggleRequestsOpen] = useToggle(false);
	const { leave } = useContext(CarpoolContext);

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					margin: '0.5rem 0',
				}}
			>
				<span style={spanStyle} onClick={toggleRequestsOpen}>
					<MailOutlineIcon style={{ marginRight: '0.5rem' }} /> View requests
				</span>
				<span style={spanStyle} onClick={toggleInvitationsOpen}>
					<PersonAddIcon style={{ marginRight: '0.5rem' }} /> Invite
				</span>
				<span style={spanStyle} onClick={leave}>
					<EventBusyIcon style={{ marginRight: '0.5rem' }} /> Leave
				</span>
			</div>

			{invitationsOpen && <InvitationList />}
			{requestsOpen && <RequestList />}
		</>
	);
}
