import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useContext } from 'react';

import { CarpoolContext } from './Carpool';

export default function CarpoolDetails() {
	const { carpool } = useContext(CarpoolContext);
	return (
		<div>
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
