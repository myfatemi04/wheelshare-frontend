export default function CarpoolMapLegend() {
	return (
		<div style={{ display: 'flex', alignItems: 'center', margin: '1rem' }}>
			<img src="/markers/red.png" alt="Red marker"></img> Me
			<img src="/markers/blue.png" alt="Blue marker"></img> Other
			<img src="/markers/green.png" alt="Green marker"></img> Event
		</div>
	);
}
