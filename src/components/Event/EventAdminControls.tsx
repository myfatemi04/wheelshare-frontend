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

	const [onPressDelete, deletionStatus] = useAsyncCallback(
		useCallback(() => deleteEvent(id), [id])
	);

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
			{deletionStatus === AsyncCallbackStatus.NONE ? (
				<UIPressable onClick={onPressDelete}>Delete</UIPressable>
			) : deletionStatus === AsyncCallbackStatus.PENDING ? (
				<span>Deleting...</span>
			) : deletionStatus === AsyncCallbackStatus.RESOLVED ? (
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
