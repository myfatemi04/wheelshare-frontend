import { useState, useCallback } from 'react';
import { deleteGroup } from '../api';
import { IGroup } from '../types';
import UILink from '../UI/UILink';
import UIPressable from '../UI/UIPressable';
import UISecondaryBox from '../UI/UISecondaryBox';

export default function GroupSettings({ group }: { group: IGroup }) {
	const [deletionSuccessful, setDeletionSuccessful] =
		useState<boolean | null>(null);

	const [confirmingDeletion, setConfirmingDeletion] = useState(false);

	const onClickedDelete = useCallback(() => {
		deleteGroup(group.id)
			.then(({ status }) => {
				setDeletionSuccessful(status === 'success');
			})
			.catch(() => setDeletionSuccessful(false));
	}, [group.id]);

	const confirmDeletion = useCallback(() => {
		setConfirmingDeletion(false);
		onClickedDelete();
	}, [onClickedDelete]);

	const cancelDeletion = useCallback(() => {
		setConfirmingDeletion(false);
	}, [setConfirmingDeletion]);

	return (
		<UISecondaryBox style={{ textAlign: 'center', minWidth: '20rem' }}>
			<h3>Settings</h3>
			{deletionSuccessful !== true &&
				(confirmingDeletion ? (
					<>
						<UIPressable onClick={confirmDeletion}>Confirm</UIPressable>
						<UIPressable onClick={cancelDeletion}>Cancel</UIPressable>
					</>
				) : (
					<UIPressable onClick={() => setConfirmingDeletion(true)}>
						Delete Group
					</UIPressable>
				))}
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
