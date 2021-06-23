import React, { useCallback, useState } from 'react';
import UIButton from './UIButton';
import UISecondaryBox from './UISecondaryBox';
import UITextInput from './UITextInput';

export default function GroupCreator() {
	const [name, setName] = useState('');
	const createGroup = useCallback(() => {
		fetch('http://localhost:5000/api/groups', {
			method: 'post',
			body: JSON.stringify({
				name,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}, [name]);

	return (
		<UISecondaryBox style={{ width: '100%', boxSizing: 'border-box' }}>
			<h1 style={{ textAlign: 'center' }}>Create Group</h1>
			Name
			<UITextInput onChangeText={setName} value={name} />
			<UIButton onClick={createGroup}>Create group</UIButton>
		</UISecondaryBox>
	);
}
