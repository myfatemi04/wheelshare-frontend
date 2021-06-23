import Events from './Events';
import Groups from './Groups';
import UIPrimaryTitle from './UIPrimaryTitle';

export default function WheelShare() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '30rem',
				maxWidth: '30rem',
				marginLeft: 'auto',
				marginRight: 'auto',
			}}
		>
			<UIPrimaryTitle>WheelShare</UIPrimaryTitle>

			<Groups />
			<Events />
		</div>
	);
}
