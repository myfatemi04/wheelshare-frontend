import { useCallback, useState } from 'react';
import { green, lightgrey } from '../../lib/colors';
import { createEvent } from '../api';
import { IGroup } from '../types';
import UIButton from '../UI/UIButton';
import UIDateInput from '../UI/UIDateInput';
import UIDatetimeInput from '../UI/UIDatetimeInput';
import UIPlacesAutocomplete from '../UI/UIPlacesAutocomplete';
import UISecondaryBox from '../UI/UISecondaryBox';
import UITextInput from '../UI/UITextInput';
import useToggle from '../useToggle';
import DaysOfWeekSelector from './DaysOfWeekSelector';

const noop = () => {};

export default function EventCreator({ group }: { group: IGroup }) {
	const [name, setName] = useState('');
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [endTime, setEndTime] = useState<Date | null>(null);
	const [placeId, setPlaceId] = useState<string | null>(null);
	const [creating, setCreating] = useState(false);
	const [createdEventId, setCreatedEventId] = useState(-1);

	const [recurring, toggleRecurring] = useToggle(false);
	const [daysOfWeek, setDaysOfWeek] = useState(0);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const durationIsNegative =
		endTime && startTime && endTime.getTime() < startTime.getTime();

	const buttonEnabled =
		name.length > 0 &&
		startTime != null &&
		endTime != null &&
		placeId != null &&
		(!recurring || daysOfWeek || endDate !== null) &&
		!durationIsNegative &&
		!creating;

	const onClickedCreateEvent = useCallback(() => {
		if (!creating) {
			if (startTime === null) {
				console.warn(
					'Tried to create an event where the start time was unspecified.'
				);
				return;
			}

			if (placeId === null) {
				console.warn(
					'Tried tro create an event where the placeId was unspecified.'
				);
				return;
			}

			const duration =
				endTime !== null ? (endTime.getTime() - startTime.getTime()) / 60 : 0;

			setCreating(true);

			createEvent({
				name,
				startTime,
				duration,
				endDate,
				groupId: group.id,
				placeId,
				daysOfWeek,
			})
				.then(({ id }) => {
					setCreatedEventId(id);
				})
				.catch(console.error) // TODO error handling
				.finally(() => setCreating(false));
		}
	}, [
		creating,
		name,
		startTime,
		endTime,
		group.id,
		placeId,
		daysOfWeek,
		endDate,
	]);

	return (
		<UISecondaryBox style={{ textAlign: 'center', minWidth: '25rem' }}>
			<h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
				Create Event
			</h3>
			<h4 style={{ textAlign: 'center', marginTop: '0.5rem' }}>{group.name}</h4>
			Name
			<UITextInput value={name} onChangeText={setName} disabled={creating} />
			<br />
			Start time
			<UIDatetimeInput onChangedDate={setStartTime} disabled={creating} />
			<br />
			End time
			<UIDatetimeInput onChangedDate={setEndTime} disabled={creating} />
			<br />
			Location
			<UIPlacesAutocomplete
				onSelected={(address, placeId) => {
					setPlaceId(placeId);
				}}
			/>
			<UIButton
				onClick={toggleRecurring}
				style={{
					backgroundColor: recurring ? green : lightgrey,
					color: recurring ? 'white' : 'black',
					transition: 'color 0.2s, background-color 0.2s',
					marginBottom: '1.5rem',
				}}
			>
				Recurring event
			</UIButton>
			{recurring && (
				<>
					Days of week
					<DaysOfWeekSelector
						daysOfWeek={daysOfWeek}
						update={setDaysOfWeek}
						disabled={creating}
					/>
					Date of last occurence
					<UIDateInput onChangedDate={setEndDate} disabled={creating} />
				</>
			)}
			{durationIsNegative && (
				<span style={{ marginTop: '1rem' }}>
					The start time can't be after the end time.
				</span>
			)}
			{createdEventId === -1 ? (
				<UIButton
					onClick={buttonEnabled ? onClickedCreateEvent : noop}
					style={!buttonEnabled ? { color: 'grey' } : {}}
				>
					{creating ? 'Creating event' : 'Create event'}
				</UIButton>
			) : (
				<span style={{ marginTop: '1rem' }}>
					Created <b>{name}</b>.
				</span>
			)}
		</UISecondaryBox>
	);
}
