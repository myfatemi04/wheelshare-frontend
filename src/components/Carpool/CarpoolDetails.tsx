import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useCallback } from 'react';
import { useContext } from 'react';
import { setCarpoolNote } from '../api';

import { CarpoolContext } from './Carpool';
import CarpoolNote from './CarpoolNote';

export default function CarpoolDetails() {
	const { carpool } = useContext(CarpoolContext);
	const onSaveCarpoolNote = useCallback(
		(note) => {
			setCarpoolNote(carpool.id, note).then(() => {
				carpool.note = note;
			});
		},
		[carpool]
	);

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
			<CarpoolNote note={carpool.note} setNote={onSaveCarpoolNote} />
		</div>
	);
}
