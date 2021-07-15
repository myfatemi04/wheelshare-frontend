import { useState } from 'react';
import { IGroup } from '../types';
import UIPressable from '../UI/UIPressable';
import UISecondaryBox from '../UI/UISecondaryBox';

export default function GroupMembersLink({ group }: { group: IGroup }) {
	const [open, setOpen] = useState(false);

	const handleClick = () => setOpen(!open);

	return (
		<>
			<UIPressable onClick={handleClick}>Members</UIPressable>
			{open && (
				<>
					<br />
					<UISecondaryBox>
						<h1>Members</h1>
						{group.users.map(({ name }) => (
							<span key={name}>{name}</span>
						))}
					</UISecondaryBox>
				</>
			)}
		</>
	);
}
