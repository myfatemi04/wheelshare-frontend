import { useMemo, CSSProperties, MouseEventHandler, ReactNode } from 'react';

const baseStyle: CSSProperties = {
	padding: '1rem',
	borderRadius: '0.5em',
	textTransform: 'uppercase',
	fontWeight: 500,
	margin: '0.5em',
	cursor: 'pointer',
	userSelect: 'none',
};

export default function UIButton({
	style,
	children,
	onClick,
}: {
	style?: CSSProperties;
	children: ReactNode;
	onClick: MouseEventHandler<HTMLDivElement>;
}) {
	const computedStyle = useMemo(() => {
		if (!style) {
			return baseStyle;
		}
		return { ...baseStyle, ...style };
	}, [style]);

	return (
		<div style={computedStyle} onClick={onClick}>
			{children}
		</div>
	);
}
