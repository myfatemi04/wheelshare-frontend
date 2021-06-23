import { useCallback, useState } from 'react';
import { post } from './api';
import { IGroup } from './Group';
import UIButton from './UIButton';
import UIDatetimeInput from './UIDatetimeInput';
import UIPlacesAutocomplete from './UIPlacesAutocomplete';
import UISecondaryBox from './UISecondaryBox';
import UITextInput from './UITextInput';

export default function EventCreator({ group }: { group: IGroup }) {
	const [name, setName] = useState('');
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [endTime, setEndTime] = useState<Date | null>(null);
	const [placeId, setPlaceId] = useState<string | null>(null);

	const createEvent = useCallback(() => {
		post('/events', {
			name,
			startTime,
			endTime,
			groupId: group.id,
			placeId,
		})
			.then((response) => response.json())
			.then(({ id }) => {
				window.location.href = `/groups/${id}`;
			});
	}, [name, startTime, endTime, group.id, placeId]);

	return (
		<UISecondaryBox style={{ width: '100%', boxSizing: 'border-box' }}>
			<h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
				Create Event
			</h1>
			<h3 style={{ textAlign: 'center', marginTop: '0.5rem' }}>{group.name}</h3>
			Name
			<UITextInput value={name} onChangeText={setName} />
			<br />
			Start time
			<UIDatetimeInput onChangedDate={setStartTime} />
			<br />
			End time
			<UIDatetimeInput onChangedDate={setEndTime} />
			<br />
			Location
			<UIPlacesAutocomplete
				onSelected={(address, placeId) => {
					setPlaceId(placeId);
				}}
			/>
			<UIButton onClick={createEvent}>Create Event</UIButton>
		</UISecondaryBox>
	);
}
