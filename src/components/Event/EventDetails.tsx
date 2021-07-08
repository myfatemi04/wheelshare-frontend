import formatStartAndEndTime from '../dates';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
				marginBottom: '0.5rem',
				textAlign: 'left',
			}}
		>
			<div
				style={{
					color: '#303030',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<EventIcon style={{ marginRight: '1rem' }} />
				{formatStartAndEndTime(startTime, endTime)}
			</div>
			<br />
			<div
				style={{
					color: '#303030',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<LocationOnIcon style={{ marginRight: '1rem' }} />
				{formattedAddress}
			</div>
		</div>
	);
}
