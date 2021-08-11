import ActiveCarpools from './ActiveCarpools/ActiveCarpools';
import ActiveEvents from './ActiveEvents/Events';
import Groups from './Groups/Groups';

export default function WheelShare() {
	return (
		<>
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
						flex: 1,
						padding: '1rem',
						minWidth: '20rem',
					}}
				>
					<ActiveCarpools />
					<Groups />
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						flex: 1,
						padding: '1rem',
						minWidth: '20rem',
					}}
				>
					<ActiveEvents />
				</div>
			</div>
		</>
	);
}
