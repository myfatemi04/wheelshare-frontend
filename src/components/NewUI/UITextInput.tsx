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
	onChangeText,
}: {
	value: string;
	onChangeText: (text: string) => void;
}) {
	return (
		<input
			style={baseStyle}
			value={value}
			onChange={(e) => onChangeText(e.target.value)}
		/>
	);
}
