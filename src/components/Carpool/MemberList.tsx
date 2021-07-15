import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { useInvitationState } from '../../state/Notifications/NotificationsHooks';
import { NotificationsContext } from '../../state/Notifications/NotificationsProvider';
import { lightgrey } from '../../lib/colors';
import { useMe } from '../hooks';
import UIButton from '../UI/UIButton';
import { CarpoolContext } from './Carpool';

function MemberRow({ member }: { member: { id: number; name: string } }) {
	return (
		<div style={{ display: 'flex', alignItems: 'center' }} key={member.id}>
			<AccountCircleIcon style={{ marginRight: '8px' }} />
			<div>{member.name}</div>
		</div>
	);
}

const shownMembersCount = 2;

const defaultMe = { id: 0, name: '' };

export default function MemberList() {
	const { leave, carpool } = useContext(CarpoolContext);
	const members = carpool.members;
	const membersToShow = members.slice(0, shownMembersCount);
	const hiddenMemberCount = members.length - membersToShow.length;

	const {
		sendCarpoolRequest,
		cancelCarpoolRequest,
		acceptCarpoolInvite,
		denyCarpoolInvite,
	} = useContext(NotificationsContext);
	const invitationState = useInvitationState(carpool.id);

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

	const isMember = useMemo(() => {
		return members.some(({ id }) => id === me?.id);
	}, [me?.id, members]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignSelf: 'center',
				alignItems: 'center',
			}}
		>
			<h3 style={{ marginBlockEnd: '0' }}>Members</h3>
			{members.length > 0 ? (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{membersToShow.map((member) => (
						<MemberRow member={member} key={member.id} />
					))}
					{hiddenMemberCount > 0 &&
						(hiddenMemberCount === 1
							? hiddenMemberCount + ' other...'
							: hiddenMemberCount + ' others...')}
				</div>
			) : (
				'This carpool has no members.'
			)}

			{isMember ? (
				<UIButton onClick={leave} style={{ backgroundColor: lightgrey }}>
					Leave
				</UIButton>
			) : invitationState === 'requested' ? (
				<UIButton onClick={cancelRequest}>Cancel request to join</UIButton>
			) : invitationState === 'none' ? (
				<UIButton onClick={sendRequest}>Request to join</UIButton>
			) : (
				<span>
					You've been invited to this carpool!
					<div style={{ display: 'flex', width: '100%', textAlign: 'center' }}>
						<UIButton
							onClick={acceptInvitation}
							style={{ backgroundColor: lightgrey, flex: 1, margin: '0.5rem' }}
						>
							Accept
						</UIButton>
						<UIButton
							onClick={denyInvitation}
							style={{ backgroundColor: lightgrey, flex: 1, margin: '0.5rem' }}
						>
							Deny
						</UIButton>
					</div>
				</span>
			)}
		</div>
	);
}
