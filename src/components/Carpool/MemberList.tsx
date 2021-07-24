import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useContext, useMemo, useState } from 'react';
import UIPressable from '../UI/UIPressable';
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
	const [expanded, setExpanded] = useState(false);

	const members = carpool.members;
	const membersToShow = useMemo(
		() => (expanded ? members : members.slice(0, shownMembersCount)),
		[members, expanded]
	);
	const hiddenMemberCount = members.length - membersToShow.length;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignSelf: 'center',
				alignItems: 'center',
				boxSizing: 'border-box',
				padding: '0rem 2rem',
				width: '100%',
			}}
		>
			<h2 style={{ marginBlockEnd: '0.5rem' }}>Members</h2>
			{members.length > 0 ? (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						// alignItems: 'center',
					}}
				>
					{membersToShow.map((member) => (
						<MemberRow member={member} key={member.id} />
					))}
					<br />
					<UIPressable onClick={() => setExpanded((e) => !e)}>
						{expanded ? 'Hide' : formatOthers(hiddenMemberCount)}
					</UIPressable>
				</div>
			) : (
				'This carpool has no members.'
			)}
		</div>
	);
}
