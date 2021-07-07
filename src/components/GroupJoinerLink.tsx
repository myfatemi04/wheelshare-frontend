import { useCallback, useEffect, useState } from 'react';
import { joinGroup, resolveCode } from './api';
import UIButton from './UIButton';
import UIPressable from './UIPressable';
import UISecondaryBox from './UISecondaryBox';
import UITextInput from './UITextInput';
import useToggle from './useToggle';

export type GroupPreview = {
	name: string;
	id: number;
};

function GroupJoiner() {
	const [code, setCode] = useState('');
	const [joining, setJoining] = useState(false);

	const [group, setGroup] = useState<GroupPreview | null>(null);

	useEffect(() => {
		const initialCode = code;
		resolveCode(code).then((group) => {
			if (code === initialCode) {
				setGroup(group);
			}
		});
	}, [code]);

	const join = useCallback(() => {
		const id = group?.id;
		if (code && id) {
			console.log('Joining a group with the code', code);
			setJoining(true);
			joinGroup(id, code)
				.then(({ status }) => {
					if (status === 'success') {
						window.location.href = '/groups/' + id;
					}
				})
				.finally(() => setJoining(false));
		}
	}, [code, group?.id]);

	const buttonEnabled = code.length > 0 && !joining;

	return (
		<UISecondaryBox style={{ width: '100%', textAlign: 'center' }}>
			<h1>Join Group</h1>
			Code
			<UITextInput value={code} onChangeText={setCode} />
			{group && (
				<>
					<br />
					<span>Found group: {group.name}</span>
					<UIButton
						onClick={join}
						style={!buttonEnabled ? { color: 'grey' } : {}}
					>
						{joining ? 'Joining' : 'Join'}
					</UIButton>
				</>
			)}
		</UISecondaryBox>
	);
}

export default function GroupJoinerLink() {
	const [open, toggle] = useToggle(false);

	return (
		<>
			<UIPressable onClick={toggle}>Join Group</UIPressable>
			{open && (
				<>
					<br />
					<GroupJoiner />
				</>
			)}
		</>
	);
}
