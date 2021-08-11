export default function CarpoolMapLegend() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				margin: '0.5rem',
				backgroundColor: '#fcfcfc',
				borderRadius: '0.5rem',
				padding: '0.5rem',
			}}
		>
			<b style={{ textAlign: 'center' }}>Legend</b>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<img src="/markers/red.png" alt="Red marker"></img> My location
			</div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<img src="/markers/blue.png" alt="Blue marker"></img> Other member
				location
			</div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<img src="/markers/green.png" alt="Green marker"></img> Event location
			</div>
		</div>
	);
}
