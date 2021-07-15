import { useContext, useState } from 'react';
import UIPressable from '../UI/UIPressable';
import UISecondaryBox from '../UI/UISecondaryBox';
import { GroupContext } from './Group';
import GroupInviteCodeGenerator from './GroupInviteCodeGenerator';

export default function GroupMembersLink() {
	const [open, setOpen] = useState(false);

	const { group } = useContext(GroupContext);

	const handleClick = () => setOpen(!open);

	return (
		<>
			<UIPressable onClick={handleClick}>Members</UIPressable>
			{open && (
				<>
					<br />
					<UISecondaryBox>
						<h1>Members</h1>

						<GroupInviteCodeGenerator />

						{group.users.map(({ name }) => (
							<span key={name}>{name}</span>
						))}
					</UISecondaryBox>
				</>
			)}
		</>
	);
}
