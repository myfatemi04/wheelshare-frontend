import { useCallback, useEffect, useState } from 'react';
import { joinGroup, resolveCode } from './api';
import UIButton from './UI/UIButton';
import UIPressable from './UI/UIPressable';
import UITextInput from './UI/UITextInput';
import useToggle from './useToggle';

export type GroupPreview = {
	name: string;
	id: number;
};

export function GroupJoiner() {
	const [code, setCode] = useState('');
	const [joining, setJoining] = useState(false);

	const [group, setGroup] = useState<GroupPreview | null>(null);

	useEffect(() => {
		if (code) {
			const initialCode = code;
			resolveCode(code)
				.then((group) => {
					if (code === initialCode) {
						setGroup(group);
					}
				})
				.catch(console.error);
		}
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
				.catch(console.error)
				.finally(() => setJoining(false));
		}
	}, [code, group?.id]);

	const buttonEnabled = code.length > 0 && !joining;

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<span style={{ fontSize: '0.875rem' }}>Join group with code:</span>
			<UITextInput
				value={code}
				onChangeText={setCode}
				style={{ border: '2px solid grey' }}
			/>
			{group && (
				<>
					<br />
					<span>
						Found group: <b>{group.name}</b>
					</span>
					<UIButton
						onClick={join}
						style={!buttonEnabled ? { color: 'grey' } : {}}
					>
						{joining ? 'Joining' : 'Join'}
					</UIButton>
				</>
			)}
		</div>
	);
}

export default function GroupJoinerLink() {
	const [open, toggle] = useToggle(false);

	return (
		<div style={{ width: '100%', textAlign: 'center' }}>
			<UIPressable onClick={toggle}>Join Group</UIPressable>
			{open && (
				<>
					<br />
					<GroupJoiner />
				</>
			)}
		</div>
	);
}
