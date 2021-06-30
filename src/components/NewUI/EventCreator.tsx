import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { post } from './api';
import { toggleBit } from './bits';
import { green, lightgrey } from './colors';
import { IGroup } from './Group';
import UIButton from './UIButton';
import UIDatetimeInput from './UIDatetimeInput';
import UIPlacesAutocomplete from './UIPlacesAutocomplete';
import UISecondaryBox from './UISecondaryBox';
import UITextInput from './UITextInput';
import useToggle from './useToggle';

const noop = () => {};

const DAY_NAMES = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

function DaysOfWeekSelector({
	daysOfWeek,
	update,
}: {
	daysOfWeek: number;
	update: Dispatch<SetStateAction<number>>;
}) {
	const toggleDayOfWeek = useCallback(
		function (idx: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
			update((daysOfWeek) => toggleBit(daysOfWeek, idx));
		},
		[update]
	);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				margin: '1rem auto',
			}}
		>
			{DAY_NAMES.map((name, idx) => {
				const mask = 0b1000_0000 >> (idx + 1);
				const active = (daysOfWeek & mask) !== 0;
				return (
					<div
						style={{
							borderRadius: '100%',
							cursor: 'pointer',
							backgroundColor: active ? green : lightgrey,
							color: active ? 'white' : 'black',
							userSelect: 'none',
							width: '2em',
							height: '2em',
							margin: '0.5rem',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						onClick={() =>
							// @ts-ignore
							toggleDayOfWeek(idx + 1)
						}
					>
						{name.charAt(0)}
					</div>
				);
			})}
		</div>
	);
}

export default function EventCreator({ group }: { group: IGroup }) {
	const [name, setName] = useState('');
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [endTime, setEndTime] = useState<Date | null>(null);
	const [placeId, setPlaceId] = useState<string | null>(null);
	const [creating, setCreating] = useState(false);
	const [createdEventId, setCreatedEventId] = useState(-1);

	const [recurring, toggleRecurring] = useToggle(false);
	const [daysOfWeek, setDaysOfWeek] = useState(0);

	const buttonEnabled =
		name.length > 0 &&
		startTime != null &&
		endTime != null &&
		placeId != null &&
		!creating;

	const createEvent = useCallback(() => {
		if (!creating) {
			setCreating(true);
			post('/events', {
				name,
				startTime,
				endTime,
				groupId: group.id,
				placeId,
			})
				.then((response) => response.json())
				.then(({ id }) => {
					setCreatedEventId(id);
				})
				.finally(() => setCreating(false));
		}
	}, [creating, name, startTime, endTime, group.id, placeId]);

	return (
		<UISecondaryBox style={{ width: '100%', boxSizing: 'border-box' }}>
			<h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
				Create Event
			</h1>
			<h3 style={{ textAlign: 'center', marginTop: '0.5rem' }}>{group.name}</h3>
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
				}}
			>
				Recurring event
			</UIButton>
			{recurring && (
				<DaysOfWeekSelector daysOfWeek={daysOfWeek} update={setDaysOfWeek} />
			)}
			{createdEventId === -1 ? (
				<UIButton
					onClick={buttonEnabled ? createEvent : noop}
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
