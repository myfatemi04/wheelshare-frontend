import { CSSProperties, ReactNode, useMemo } from 'react';

const baseStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: '#f9f9f9',
	borderRadius: '0.5rem',
	padding: '1rem',
	marginBottom: '1em',
	boxSizing: 'border-box',
};

export default function UISecondaryBox({
	children,
	style,
}: {
	children: ReactNode;
	style?: CSSProperties;
}) {
	const computedStyle = useMemo(() => {
		if (!style) {
			return baseStyle;
		}
		return { ...baseStyle, ...style };
	}, [style]);
	return <div style={computedStyle}>{children}</div>;
}
