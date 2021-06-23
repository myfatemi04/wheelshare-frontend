import { CSSProperties, ReactNode, useMemo } from 'react';

const baseStyle: CSSProperties = {
	textDecoration: 'none',
	cursor: 'pointer',
	userSelect: 'none',
};

export default function UIPressable({
	onClick,
	style,
	children,
}: {
	onClick: () => void;
	style?: CSSProperties;
	children: ReactNode;
}) {
	const computedStyle = useMemo(() => {
		return !style ? baseStyle : { ...baseStyle, ...style };
	}, [style]);

	return (
		<div onClick={onClick} style={computedStyle}>
			{children}
		</div>
	);
}
