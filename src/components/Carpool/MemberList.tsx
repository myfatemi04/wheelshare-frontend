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

export default function MemberList({
	members,
}: {
	members: {
		id: number;
		name: string;
	}[];
}) {
	const { leave, carpool } = useContext(CarpoolContext);
	const membersToShow = members.slice(0, 2);
	const hiddenMemberCount = members.length - membersToShow.length;
	const me = useMe()!;

	const isMember = useMemo(() => {
		return members.some(({ id }) => id === me.id);
	}, [me.id, members]);

	const { sendCarpoolRequest, cancelCarpoolRequest } =
		useContext(NotificationsContext);
	const invitationState = useInvitationState(carpool.id);

	const sendRequest = useCallback(() => {
		sendCarpoolRequest(carpool.id);
	}, [carpool.id, sendCarpoolRequest]);

	const cancelRequest = useCallback(() => {
		cancelCarpoolRequest(carpool.id);
	}, [carpool.id, cancelCarpoolRequest]);

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
					You've been invited, we need to make it so you can accept the invite
				</span>
			)}
		</div>
	);
}
