import { useCallback } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import UIButton from '../components/UI/UIButton';
import UIDatetimeInput from '../components/UI/UIDatetimeInput';
import UIPlacesAutocomplete from '../components/UI/UIPlacesAutocomplete';
import UITextInput from '../components/UI/UITextInput';
import WheelShareContext from './WheelShareContext';

export default function PlanEvent() {
	const [name, setName] = useState('');
	const [startTime, setStartTime] = useState<null | Date>(null);
	const [endTime, setEndTime] = useState<null | Date>(null);
	const [placeId, setPlaceId] = useState<null | string>(null);
	const [moderatorCode, setModeratorCode] = useState('');

	const { api } = useContext(WheelShareContext);

	const create = useCallback(() => {
		if (!startTime || !endTime || !name || !moderatorCode || !placeId) {
			console.error('Tried to create event with incomplete fields.');
			console.error({ startTime, endTime, name, moderatorCode, placeId });
			return;
		}

		api
			.createEvent(name, startTime, endTime, moderatorCode, placeId)
			.then(({ eventId }) => {
				console.log('resulting eventId:', eventId);
			});
	}, [api, endTime, moderatorCode, name, placeId, startTime]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '30rem' }}>
			<h2>Plan an event</h2>
			<b>Event Name</b>
			<UITextInput
				value={name}
				onChangeText={setName}
				style={{ border: '1px solid gray' }}
			/>
			<br />
			<b>Location</b>
			<UIPlacesAutocomplete
				style={{ border: '1px solid gray' }}
				onSelected={(address, placeId) => setPlaceId(placeId)}
			/>
			<br />
			<b>Start time</b>
			<UIDatetimeInput
				onChangedDate={setStartTime}
				style={{ border: '1px solid gray' }}
			/>
			<br />
			<b>End time</b>
			<UIDatetimeInput
				onChangedDate={setEndTime}
				style={{ border: '1px solid gray' }}
			/>
			<br />
			<b>Admin code</b> (used to modify details about the event)
			<UITextInput
				value={moderatorCode}
				onChangeText={setModeratorCode}
				style={{ border: '1px solid gray' }}
			/>
			<UIButton onClick={create}>Create</UIButton>
		</div>
	);
}
