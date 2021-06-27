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
}: {
	value: string;
	disabled?: boolean;
	onChangeText: (text: string) => void;
}) {
	const onChange = useCallback(
		(e) => onChangeText(e.target.value),
		[onChangeText]
	);
	return (
		<input
			style={baseStyle}
			value={value}
			disabled={disabled}
			onChange={onChange}
		/>
	);
}
