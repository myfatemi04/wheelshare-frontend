import { ION_AUTHORIZATION_ENDPOINT } from '../api';
import Button from '@material-ui/core/Button';

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
				<Button
					onClick={() => (window.location.href = ION_AUTHORIZATION_ENDPOINT)}
				>
					Sign In with Ion
				</Button>
			</div>
		</div>
	);
}
