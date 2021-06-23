import { useCallback, useState } from 'react';
import UIButton from './UIButton';
import UIDatetimeInput from './UIDatetimeInput';
import UIPlacesAutocomplete from './UIPlacesAutocomplete';
import UISecondaryBox from './UISecondaryBox';
import UITextInput from './UITextInput';

export default function EventCreator() {
	const [name, setName] = useState('');
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [endTime, setEndTime] = useState<Date | null>(null);
	const [placeId, setPlaceId] = useState<string | null>(null);
	const [groupId, setGroupId] = useState('');

	const createEvent = useCallback(() => {
		fetch('http://localhost:5000/api/events', {
			method: 'post',
			body: JSON.stringify({
				name,
				startTime,
				endTime,
				groupId,
				placeId,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}, [name, startTime, endTime, groupId, placeId]);

	return (
		<UISecondaryBox style={{ width: '100%', boxSizing: 'border-box' }}>
			<h1 style={{ textAlign: 'center' }}>Create Event</h1>
			Name
			<UITextInput value={name} onChangeText={setName} />
			<br />
			Group
			<UITextInput value={groupId} onChangeText={setGroupId} />
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
