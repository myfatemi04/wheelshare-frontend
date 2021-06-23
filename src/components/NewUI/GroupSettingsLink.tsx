import { useCallback, useState } from 'react';
import { IGroup } from './Group';
import UILink from './UILink';
import UIPressable from './UIPressable';
import UISecondaryBox from './UISecondaryBox';

function GroupSettings({ group }: { group: IGroup }) {
	const [deletionSuccessful, setDeletionSuccessful] =
		useState<boolean | null>(null);

	const deleteGroup = useCallback(() => {
		fetch('http://localhost:5000/api/groups/' + group.id, { method: 'delete' })
			.then((res) => res.json())
			.then(({ status }) => {
				setDeletionSuccessful(status === 'success');
			})
			.catch(() => {
				setDeletionSuccessful(false);
			});
	}, [group.id]);

	return (
		<UISecondaryBox>
			<h1>Settings</h1>
			{deletionSuccessful !== true && (
				<UIPressable onClick={deleteGroup}>Delete Group</UIPressable>
			)}
			{deletionSuccessful !== null &&
				(deletionSuccessful ? (
					<span>
						<b>{group.name}</b> was deleted.
						<br />
						<UILink href="/">Home</UILink>
					</span>
				) : (
					<span>
						For some reason, <b>{group.name}</b> was not successfully deleted.
					</span>
				))}
		</UISecondaryBox>
	);
}

export default function GroupSettingsLink({ group }: { group: IGroup }) {
	const [open, setOpen] = useState(false);
	const toggle = useCallback(() => {
		setOpen((open) => !open);
	}, []);

	return (
		<div>
			<div
				style={{
					cursor: 'pointer',
					userSelect: 'none',
				}}
				onClick={toggle}
			>
				Settings
			</div>
			{open && (
				<>
					<br />
					<GroupSettings group={group} />
				</>
			)}
		</div>
	);
}
