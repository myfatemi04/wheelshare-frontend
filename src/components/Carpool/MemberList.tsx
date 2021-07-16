import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useContext } from 'react';
import { CarpoolContext } from './Carpool';

function MemberRow({ member }: { member: { id: number; name: string } }) {
	return (
		<div style={{ display: 'flex', alignItems: 'center' }} key={member.id}>
			<AccountCircleIcon style={{ marginRight: '8px' }} />
			<div>{member.name}</div>
		</div>
	);
}

function formatOthers(hiddenMemberCount: number) {
	if (hiddenMemberCount === 0) {
		return '';
	}

	if (hiddenMemberCount === 1) {
		return '1 other...';
	}

	return `${hiddenMemberCount} others...`;
}

const shownMembersCount = 2;

export default function MemberList() {
	const { carpool } = useContext(CarpoolContext);
	const members = carpool.members;
	const membersToShow = members.slice(0, shownMembersCount);
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
			<h2 style={{ marginBlockEnd: '0.5rem' }}>Members</h2>
			{members.length > 0 ? (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{membersToShow.map((member) => (
						<MemberRow member={member} key={member.id} />
					))}
					{formatOthers(hiddenMemberCount)}
				</div>
			) : (
				'This carpool has no members.'
			)}
		</div>
	);
}
