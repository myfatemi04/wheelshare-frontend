import Event from './Event';

export default function App() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				maxWidth: '50rem',
				marginLeft: 'auto',
				marginRight: 'auto',
			}}
		>
			<h1
				style={{
					fontSize: '4rem',
					marginTop: '0.25em',
					marginBottom: '0.25em',
				}}
			>
				WheelShare
			</h1>
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
