import { useCallback, useState } from 'react';
import { deleteEvent } from '../api';
import UIPressable from '../UI/UIPressable';
import { useCurrentEventId } from './EventHooks';

export enum AsyncCallbackStatus {
	NONE = 0,
	PENDING = 1,
	RESOLVED = 2,
	REJECTED = 3,
}

export function useAsyncCallback<T, A extends unknown[]>(
	callback: (...args: A) => Promise<T>
) {
	const [status, setStatus] = useState(AsyncCallbackStatus.NONE);

	const cb = useCallback(
		(...args: any) => {
			setStatus(AsyncCallbackStatus.PENDING);

			callback(...args)
				.then(() => setStatus(AsyncCallbackStatus.RESOLVED))
				.catch(() => setStatus(AsyncCallbackStatus.REJECTED));
		},
		[callback]
	);

	const reset = useCallback(() => setStatus(AsyncCallbackStatus.NONE), []);

	return [cb as typeof callback, status, reset] as const;
}

export default function EventAdminControls() {
	const id = useCurrentEventId();
	// const desc = useCurrentEventDescription();

	// const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);

	const [eventDeletionConfirmationShown, setEventDeletionConfirmationShown] =
		useState(false);
	const [eventDeletionStatus, setEventDeletionStatus] =
		useState<null | 'deleting' | 'deleted' | 'errored'>(null);

	const onPressInitialDelete = useCallback(() => {
		setEventDeletionConfirmationShown(true);
	}, []);

	const onPressCancelDelete = useCallback(() => {
		setEventDeletionConfirmationShown(false);
	}, []);

	const onPressConfirmDelete = useCallback(() => {
		setEventDeletionConfirmationShown(false);
		setEventDeletionStatus('deleting');
		deleteEvent(id)
			.then(() => setEventDeletionStatus('deleted'))
			.catch(() => setEventDeletionStatus('errored'));
	}, [id]);

	// const [onSaveDescription, saveDescriptionStatus] = useAsyncCallback(
	// 	useCallback(() => {
	// 		if (!descriptionTextareaRef.current) {
	// 			return Promise.reject('Textarea not ready');
	// 		}
	// 		setEditDescriptionOpen(false);
	// 		return setEventDescription(id, descriptionTextareaRef.current.value);
	// 	}, [id])
	// );

	// const [editDescriptionOpen, setEditDescriptionOpen] = useState(false);

	return (
		<div style={{ display: 'flex' }}>
			{eventDeletionConfirmationShown ? (
				<>
					<UIPressable
						onClick={onPressCancelDelete}
						style={{ marginRight: '1rem' }}
					>
						Cancel deletion
					</UIPressable>
					<UIPressable onClick={onPressConfirmDelete}>
						Confirm deletion
					</UIPressable>
				</>
			) : eventDeletionStatus === null ? (
				<UIPressable onClick={onPressInitialDelete}>Delete</UIPressable>
			) : eventDeletionStatus === 'deleting' ? (
				<span>Deleting...</span>
			) : eventDeletionStatus === 'deleted' ? (
				<span>Deleted</span>
			) : (
				<span>Delete failed</span>
			)}

			{/* {!editDescriptionOpen ? (
				<UIPressable onClick={() => setEditDescriptionOpen(true)}>
					Edit description
				</UIPressable>
			) : (
				<>
					<textarea defaultValue={desc} ref={descriptionTextareaRef} />
					<UIPressable onClick={onSaveDescription}>Save</UIPressable>
					<UIPressable onClick={() => setEditDescriptionOpen(false)}>
						Cancel
					</UIPressable>
				</>
			)} */}
		</div>
	);
}
