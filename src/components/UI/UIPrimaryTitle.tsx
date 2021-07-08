import { CSSProperties, ReactNode } from 'react';

const style: CSSProperties = {
	fontSize: '3rem',
	marginTop: '0.25em',
	marginBottom: '0.25em',
};

export default function UIPrimaryTitle({ children }: { children: ReactNode }) {
	return <h1 style={style}>{children}</h1>;
}
