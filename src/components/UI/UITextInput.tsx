import { CSSProperties } from 'react';
import { useCallback } from 'react';

const baseStyle = {
	marginTop: '0.5em',
	padding: '0.5em',
	fontFamily: 'Inter',
	fontSize: '1.25rem',
	borderRadius: '0.5em',
	border: '0px',
};

export default function UITextInput({
	value,
	disabled = false,
	onChangeText,
	password = false,
	style = {},
}: {
	value: string;
	disabled?: boolean;
	onChangeText: (text: string) => void;
	password?: boolean;
	style?: CSSProperties;
}) {
	const onChange = useCallback(
		(e) => onChangeText(e.target.value),
		[onChangeText]
	);
	return (
		<input
			style={{ ...baseStyle, ...style }}
			value={value}
			disabled={disabled}
			onChange={onChange}
			type={password ? 'password' : 'text'}
			autoCapitalize="new-password"
		/>
	);
}
