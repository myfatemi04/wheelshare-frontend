import { useCallback, useState } from 'react';
import { post } from './api';
import { IGroup } from './Group';
import UIButton from './UIButton';
import UIDatetimeInput from './UIDatetimeInput';
import UIPlacesAutocomplete from './UIPlacesAutocomplete';
import UISecondaryBox from './UISecondaryBox';
import UITextInput from './UITextInput';

const noop = () => {};

export default function EventCreator({ group }: { group: IGroup }) {
	const [name, setName] = useState('');
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [endTime, setEndTime] = useState<Date | null>(null);
	const [placeId, setPlaceId] = useState<string | null>(null);
	const [creating, setCreating] = useState(false);
	const [createdEventId, setCreatedEventId] = useState(-1);

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
