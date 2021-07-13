import { CSSProperties } from 'react';

const baseStyle: CSSProperties = {
	fontSize: '3rem',
	marginTop: '0.25em',
	marginBottom: '0.25em',
};

export default function UIPrimaryTitle({
	children,
	style,
	...props
}: JSX.IntrinsicElements['h1']) {
	return (
		<h1 style={style ? { ...baseStyle, ...style } : baseStyle} {...props}>
			{children}
		</h1>
	);
}
