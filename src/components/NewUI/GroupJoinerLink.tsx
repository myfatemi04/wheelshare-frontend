import { useCallback, useState } from 'react';
import UIButton from './UIButton';
import UIPressable from './UIPressable';
import UISecondaryBox from './UISecondaryBox';
import UITextInput from './UITextInput';

function GroupJoiner() {
	const [code, setCode] = useState('');
	const [joining, setJoining] = useState(false);
	const join = useCallback(() => {
		if (code) {
			console.log('Joining a group with the code', code);
			setJoining(true);
			setTimeout(() => {
				setJoining(false);
			}, 500);
		}
	}, [code]);

	const buttonEnabled = code.length > 0 && !joining;

	return (
		<UISecondaryBox style={{ width: '100%', textAlign: 'center' }}>
			<h1>Join Group</h1>
			Code
			<UITextInput value={code} onChangeText={setCode} />
			<UIButton onClick={join} style={!buttonEnabled ? { color: 'grey' } : {}}>
				{joining ? 'Joining' : 'Join'}
			</UIButton>
		</UISecondaryBox>
	);
}

export default function GroupJoinerLink() {
	const [open, setOpen] = useState(false);
	const toggle = useCallback(() => {
		setOpen((open) => !open);
	}, []);

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
