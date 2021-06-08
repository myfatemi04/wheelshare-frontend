const baseStyle = {
	marginTop: '0.5em',
	padding: '0.5em',
	fontFamily: 'Inter',
	fontSize: '1.25rem',
	borderRadius: '0.5em',
	border: '0px',
};

export default function UITimeInput({
	style,
	...props
}: JSX.IntrinsicElements['input']) {
	return (
		<input
			{...props}
			type="time"
			style={style ? { ...style, ...baseStyle } : baseStyle}
		/>
	);
}
