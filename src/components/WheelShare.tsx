import { CSSProperties } from 'react';
import logout from './Authentication/logout';
import Events from './Events';
import Groups from './Groups';
import UIPressable from './UIPressable';
import UIPrimaryTitle from './UIPrimaryTitle';

const style: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '30rem',
	maxWidth: '30rem',
	marginLeft: 'auto',
	marginRight: 'auto',
};

export default function WheelShare() {
	return (
		<div style={style}>
			<UIPrimaryTitle>WheelShare</UIPrimaryTitle>

			<UIPressable onClick={logout}>Log out</UIPressable>

			<Groups />
			<Events />
		</div>
	);
}
