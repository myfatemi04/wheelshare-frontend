import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useContext } from 'react';
import { lightgrey } from '../colors';
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
	const { leave } = useContext(CarpoolContext);
	const membersToShow = members.slice(0, 2);
	const hiddenMemberCount = members.length - membersToShow.length;

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
			<UIButton onClick={leave} style={{ backgroundColor: lightgrey }}>
				Leave
			</UIButton>
		</div>
	);
}
