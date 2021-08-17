import { useContext, useMemo, useState } from 'react';
import { IEventSignup } from '../types';
import UIPressable from '../UI/UIPressable';
import { CarpoolContext } from './Carpool';
import useSignups from './useSignups';

function MemberRow({ signup }: { signup: IEventSignup }) {
	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem' }}
		>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<div>{signup.user.name}</div>
			</div>
			<span>{signup.formattedAddress}</span>
			{signup.canDrive && <b>Can drive</b>}
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

const shownMembersCount = 4;

export default function MemberList() {
	const { carpool } = useContext(CarpoolContext);
	const [expanded, setExpanded] = useState(false);

	const memberIDs = useMemo(
		() => carpool.members.map((member) => member.id),
		[carpool]
	);
	const members = useSignups(carpool.event.id, memberIDs);

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
						<MemberRow signup={member} key={member.user.id} />
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
