import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { ICarpool } from '../types';

export default function CarpoolDetails({ carpool }: { carpool: ICarpool }) {
	return (
		<div style={{ fontSize: '1.5rem', fontWeight: 400 }}>
			<div
				style={{
					color: '#303030',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<LocationOnIcon style={{ marginRight: '1rem' }} />
				{carpool.event.formattedAddress}
			</div>
			<div
				style={{
					color: '#303030',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<EventIcon style={{ marginRight: '1rem' }} />
				DAWN - DUSK
			</div>
		</div>
	);
}
