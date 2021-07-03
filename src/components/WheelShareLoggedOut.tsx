import { CSSProperties } from 'react';
import UILink from './UILink';
import UIPrimaryTitle from './UIPrimaryTitle';

const dev = true;
const ION_AUTHORIZATION_ENDPOINT = dev
	? 'https://ion.tjhsst.edu/oauth/authorize?response_type=code&client_id=rNa6n9YSg8ftINdyVPpUsaMuxNbHLo9dh1OsOktR&scope=read&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fion%2Fcallback'
	: 'https://ion.tjhsst.edu/oauth/authorize?response_type=code&client_id=rNa6n9YSg8ftINdyVPpUsaMuxNbHLo9dh1OsOktR&scope=read&redirect_uri=https%3A%2F%2Fwheelshare.space%2Fauth%2Fion%2Fcallback';

const style: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '30rem',
	maxWidth: '30rem',
	marginLeft: 'auto',
	marginRight: 'auto',
};

export default function WheelShareLoggedOut() {
	return (
		<div style={style}>
			<UIPrimaryTitle>WheelShare</UIPrimaryTitle>
			<p>To get started, log in with your Ion account.</p>
			<UILink href={ION_AUTHORIZATION_ENDPOINT}>Log in</UILink>
		</div>
	);
}
