import { useCallback, useState } from 'react';
import { createGroup } from '../api';
import UIButton from '../UI/UIButton';
import UILink from '../UI/UILink';
import UISecondaryBox from '../UI/UISecondaryBox';
import UITextInput from '../UI/UITextInput';

export default function GroupCreator() {
	const [name, setName] = useState('');
	const [creationSuccessful, setCreationSuccessful] =
		useState<boolean | null>(null);
	const [createdGroupId, setCreatedGroupId] = useState(0);
	const [creating, setCreating] = useState(false);
	const onClickedCreateGroup = useCallback(() => {
		if (!creating) {
			setCreating(true);
			createGroup(name)
				.then(({ id }) => {
					setCreationSuccessful(true);
					setCreatedGroupId(id);
				})
				.finally(() => {
					setCreating(false);
				});
		}
	}, [creating, name]);

	const buttonEnabled = name.length > 0 && !creating;

	return (
		<UISecondaryBox style={{ width: '100%', boxSizing: 'border-box' }}>
			<h1 style={{ textAlign: 'center' }}>Create Group</h1>
			Name
			<UITextInput onChangeText={setName} value={name} />
			<UIButton
				onClick={onClickedCreateGroup}
				style={!buttonEnabled ? { color: 'grey' } : {}}
			>
				{creating ? 'Creating group' : 'Create group'}
			</UIButton>
			{creationSuccessful !== null &&
				(creationSuccessful ? (
					<span>
						<UILink href={`/groups/${createdGroupId}`}>
							<b>{name}</b>
						</UILink>{' '}
						has been created.
					</span>
				) : (
					<span>
						For some reason, <b>{name}</b> could not be created.
					</span>
				))}
		</UISecondaryBox>
	);
}
