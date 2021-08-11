import { ReactNode } from 'react';

export default function UITwoColumns({
	first,
	second,
	firstFlex,
	secondFlex,
}: {
	first: ReactNode;
	second: ReactNode;
	firstFlex: number;
	secondFlex: number;
}) {
	return (
		<div
			style={{
				display: 'flex',
				width: '60rem',
				maxWidth: '100vw',
				flexWrap: 'wrap',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					flex: firstFlex,
					padding: '1rem',
					alignItems: 'center',
				}}
			>
				{first}
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					flex: secondFlex,
					padding: '1rem',
					alignItems: 'center',
				}}
			>
				{second}
			</div>
		</div>
	);
}
