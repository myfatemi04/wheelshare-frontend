import { useCallback, useContext, useState } from 'react';
import UIButton from '../components/UI/UIButton';
import UITextInput from '../components/UI/UITextInput';
import WheelShareContext from './WheelShareContext';

export default function SignUp() {
	const { api } = useContext(WheelShareContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');

	const signup = useCallback(() => {
		api.signup(email, password, name).catch((e) => {
			console.error(e);
			setError('There was an error signing up for the event.');
		});
	}, [api, email, name, password]);

	return (
		<>
			<h2>Sign Up</h2>
			Name
			<UITextInput
				style={{ border: '1px solid #c0c0c0' }}
				value={name}
				onChangeText={setName}
			/>
			<br />
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
			<UIButton style={{ border: '1px solid #c0c0c0' }} onClick={signup}>
				Sign Up
			</UIButton>
			<br />
			{error}
		</>
	);
}
