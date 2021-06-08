import Event from './Event';
import UIPrimaryTitle from './UIPrimaryTitle';

export default function App() {
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
			<Event
				title="TJ Track Regional Meet"
				group="TJHSST Track and Field"
				location="Ashburn, Virginia"
				time="11:00 AM to 2:45 PM"
			/>
			<Event
				title="End of Year Party"
				group="TJHSST 2022"
				location="Dulles, Virginia"
				time="5:00 PM to 8:00 PM"
			/>
		</div>
	);
}
