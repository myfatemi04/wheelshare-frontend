import formatStartAndEndTime from '../dates';

export default function Details({
	startTime,
	endTime,
	formattedAddress,
}: {
	startTime: string;
	endTime: string;
	formattedAddress: string;
}) {
	return (
		<div
			style={{
				marginTop: '0.5rem',
				textAlign: 'left',
			}}
		>
			<span
				style={{
					color: '#303030',
				}}
			>
				<b>When: </b>
				{formatStartAndEndTime(startTime, endTime)}
			</span>
			<br />
			<br />
			<span
				style={{
					color: '#303030',
				}}
			>
				<b>Where: </b>
				{formattedAddress}
			</span>
		</div>
	);
}
