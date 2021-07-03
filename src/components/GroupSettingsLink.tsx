import { useCallback, useState } from 'react';
import { deleteGroup } from './api';
import { IGroup } from './Group';
import UILink from './UILink';
import UIPressable from './UIPressable';
import UISecondaryBox from './UISecondaryBox';
import useToggle from './useToggle';

function GroupSettings({ group }: { group: IGroup }) {
	const [deletionSuccessful, setDeletionSuccessful] =
		useState<boolean | null>(null);

	const onClickedDelete = useCallback(() => {
		deleteGroup(group.id)
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
				<UIPressable onClick={onClickedDelete}>Delete Group</UIPressable>
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
	const [open, toggle] = useToggle(false);

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
