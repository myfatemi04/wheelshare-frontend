import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useCallback, useContext, useMemo } from 'react';
import formatStartAndEndTime from '../../lib/dates';
import { setCarpoolNote } from '../api';
import UILink from '../UI/UILink';
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
	const startTime = carpool.event.startTime;
	const endTime = useMemo(
		() =>
			startTime
				? new Date(new Date(startTime).getTime() + carpool.event.duration * 60)
				: null,
		[carpool.event.duration, startTime]
	);
	const formattedDate = useMemo(() => {
		if (startTime) {
			if (endTime) {
				return formatStartAndEndTime(startTime, endTime.toISOString());
			} else {
				return new Date(startTime).toLocaleString();
			}
		} else {
			return null;
		}
	}, [startTime, endTime]);

	return (
		<div style={{ width: '80%' }}>
			<h3>Event Details</h3>
			<UILink href={'/events/' + carpool.event.id}>{carpool.event.name}</UILink>
			<div
				style={{
					color: '#303030',
					display: 'flex',
					alignItems: 'center',
					marginTop: '1rem',
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
				{formattedDate && `${formattedDate}`}
			</div>
			<CarpoolNote note={carpool.note} setNote={onSaveCarpoolNote} />
		</div>
	);
}
