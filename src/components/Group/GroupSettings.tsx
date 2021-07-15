import { useState, useCallback } from 'react';
import { deleteGroup } from '../api';
import { IGroup } from '../types';
import UILink from '../UI/UILink';
import UIPressable from '../UI/UIPressable';
import UISecondaryBox from '../UI/UISecondaryBox';

export default function GroupSettings({ group }: { group: IGroup }) {
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
		<UISecondaryBox style={{ width: '100%', textAlign: 'center' }}>
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
