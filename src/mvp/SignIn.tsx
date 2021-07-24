import { useContext } from 'react';
import { useState } from 'react';
import UIButton from '../components/UI/UIButton';
import UITextInput from '../components/UI/UITextInput';
import WheelShareContext from './WheelShareContext';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const { api } = useContext(WheelShareContext);

	return (
		<>
			<h2>Sign In</h2>
			Email
			<UITextInput
				style={{ border: '1px solid #c0c0c0' }}
				value={email}
				onChangeText={setEmail}
			/>
			<br />
			Password
			<UITextInput
				style={{ border: '1px solid #c0c0c0' }}
				value={password}
				onChangeText={setPassword}
				password
			/>
			<br />
			<UIButton
				style={{ border: '1px solid #c0c0c0' }}
				onClick={() => {
					api.signin(email, password).catch((error) => {
						setError('error');
					});
				}}
			>
				Sign In
			</UIButton>
			<br />
			{error === 'error' && 'Password was incorrect or signup was not found'}
		</>
	);
}
