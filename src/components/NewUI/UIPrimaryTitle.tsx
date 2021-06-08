import { ReactNode } from 'react';

export default function UIPrimaryTitle({ children }: { children: ReactNode }) {
	return (
		<h1
			style={{
				fontSize: '4rem',
				marginTop: '0.25em',
				marginBottom: '0.25em',
			}}
		>
			{children}
		</h1>
	);
}
