import { forwardRef } from 'react';
import { CSSProperties, ForwardedRef, useCallback } from 'react';

const baseStyle = {
	marginTop: '0.5em',
	padding: '0.5em',
	fontFamily: 'Inter',
	fontSize: '1.25rem',
	borderRadius: '0.5em',
	border: '0px',
};

function UITextInput(
	{
		value,
		disabled = false,
		onChangeText,
		style,
	}: {
		value?: string;
		disabled?: boolean;
		onChangeText?: (text: string) => void;
		style?: CSSProperties;
	},
	ref: ForwardedRef<HTMLInputElement>
) {
	const onChange = useCallback(
		(e) => onChangeText?.(e.target.value),
		[onChangeText]
	);
	return (
		<input
			ref={ref}
			style={style ? { ...baseStyle, ...style } : baseStyle}
			value={value}
			disabled={disabled}
			onChange={onChange}
		/>
	);
}

export default forwardRef(UITextInput);
