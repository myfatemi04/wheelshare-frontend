import { useCallback, useEffect, useState } from 'react';
import { updateBio } from '../api';
import {
	AsyncCallbackStatus,
	useAsyncCallback,
} from '../Event/EventAdminControls';
import { useAuth } from '../hooks';
import UIButton from '../UI/UIButton';
import UITextInput from '../UI/UITextInput';

export default function ProfileForSelf() {
	const [editingBio, setEditingBio] = useState(false);
	const [temporaryBio, setTemporaryBio] = useState('');
	const { user: me, refresh: refreshLocalUser } = useAuth();

	const [onClickedSaveBio, onClickedSaveBioStatus] = useAsyncCallback(
		useCallback(
			async (temporaryBio: string) => {
				await updateBio(temporaryBio);
				refreshLocalUser();
				setEditingBio(false);
			},
			[refreshLocalUser]
		)
	);

	useEffect(() => {
		if (me?.bio) {
			setTemporaryBio(me?.bio);
		}
	}, [me?.bio]);

	if (!me) {
		return null;
	}

	return (
		<div style={{ minWidth: '16rem', width: '20rem' }}>
			<h1>{me.name}</h1>
			<p>{me.bio}</p>
			{editingBio ? (
				<>
					{onClickedSaveBioStatus === AsyncCallbackStatus.REJECTED && (
						<p>Error saving bio.</p>
					)}
					{onClickedSaveBioStatus !== AsyncCallbackStatus.PENDING ? (
						<>
							<UITextInput
								onChangeText={setTemporaryBio}
								value={temporaryBio}
								style={{
									border: '2px solid grey',
									width: '100%',
								}}
							/>
							<UIButton
								onClick={() => onClickedSaveBio(temporaryBio)}
								style={{
									backgroundColor: '#f8f8f8',
									width: '100%',
								}}
							>
								Save
							</UIButton>
						</>
					) : (
						<UIButton
							onClick={() => {}}
							style={{
								backgroundColor: '#f8f8f8',
								width: '100%',
							}}
						>
							Saving...
						</UIButton>
					)}
				</>
			) : (
				<>
					<UIButton
						onClick={() => setEditingBio(true)}
						style={{
							backgroundColor: '#f8f8f8',
							width: '100%',
						}}
					>
						Edit Bio
					</UIButton>
				</>
			)}
		</div>
	);
}
