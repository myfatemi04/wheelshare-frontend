import { useCallback, useEffect, useState } from 'react';
import UIPressable from '../UI/UIPressable';
import UITextInput from '../UI/UITextInput';
import useIsCreator from './useIsCreator';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Clear';

export default function CarpoolNote({
	note,
	setNote,
}: {
	note: string;
	setNote: (note: string) => void;
}) {
	const isCreator = useIsCreator();
	const [editing, setEditing] = useState(false);
	const [editText, setEditText] = useState(note);

	useEffect(() => {
		setEditText(note);
	}, [note]);

	const onCancelNote = useCallback(() => {
		setEditing(false);
		setEditText(note);
	}, [note]);

	const onSaveNote = useCallback(() => {
		setEditing(false);
		setNote(editText);
	}, [editText, setNote]);

	return (
		<div style={{ marginTop: '0.5rem', padding: '1rem' }}>
			<b>Note</b>
			<br />
			<br />
			{editing ? (
				<div>
					<UITextInput
						onChangeText={setEditText}
						value={editText}
						style={{ marginTop: 0 }}
					/>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginTop: '1rem',
						}}
					>
						<DoneIcon
							onClick={onSaveNote}
							style={{ marginRight: '1rem', cursor: 'pointer' }}
						/>
						<CancelIcon
							onClick={onCancelNote}
							style={{ marginRight: '1rem', cursor: 'pointer' }}
						/>
					</div>
				</div>
			) : (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span>{note}</span>
					{isCreator && (
						<EditIcon
							onClick={() => setEditing(true)}
							style={{ marginTop: '1rem', cursor: 'pointer' }}
						/>
					)}
				</div>
			)}
		</div>
	);
}
