import { ION_AUTHORIZATION_ENDPOINT } from '../api';

export default function Home() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<h1>Home</h1>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<a href={ION_AUTHORIZATION_ENDPOINT}>Log In with Ion</a>
			</div>
		</div>
	);
}
