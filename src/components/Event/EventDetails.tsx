import formatStartAndEndTime from '../../lib/dates';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useContext } from 'react';
import EventContext from './EventContext';

export default function EventDetails() {
	const { startTime, endTime, formattedAddress } =
		useContext(EventContext).event;

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
				{endTime
					? formatStartAndEndTime(startTime, endTime)
					: new Date(startTime).toLocaleString()}
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
