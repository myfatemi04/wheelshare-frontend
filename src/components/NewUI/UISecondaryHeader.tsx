const baseStyle = {
	marginTop: '0rem',
	marginBottom: '0.25em',
	textAlign: 'center',
} as const;

export default function UISecondaryHeader({
	style,
	children,
	...props
}: JSX.IntrinsicElements['h2']) {
	return (
		<h2 style={style ? { ...baseStyle, ...style } : baseStyle} {...props}>
			{children}
		</h2>
	);
}
