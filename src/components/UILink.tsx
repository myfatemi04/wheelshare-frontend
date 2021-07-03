import { CSSProperties, ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';

const baseStyle: CSSProperties = {
	textDecoration: 'none',
	cursor: 'pointer',
	userSelect: 'none',
};

export default function UILink({
	href,
	style,
	children,
}: {
	href: string;
	style?: CSSProperties;
	children: ReactNode;
}) {
	const computedStyle = useMemo(
		() => (!style ? baseStyle : { ...baseStyle, ...style }),
		[style]
	);

	if (href.startsWith('http://') || href.startsWith('https://')) {
		return (
			<a href={href} style={computedStyle}>
				{children}
			</a>
		);
	}

	return (
		<Link to={href} style={computedStyle}>
			{children}
		</Link>
	);
}
