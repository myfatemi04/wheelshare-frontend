import { useCallback, useEffect, useRef, useState } from 'react';
import { green, lightgrey } from '../../lib/colors';
import getPlaceDetails from '../../lib/getPlaceDetails';
import { addOrUpdateEventSignup, removeEventSignup } from '../api';
import { useMe } from '../hooks';
import UIButton from '../UI/UIButton';
import UIPlacesAutocomplete from '../UI/UIPlacesAutocomplete';
import UITextInput from '../UI/UITextInput';
import EventCarpools from './EventCarpools';
import { useMutableEvent } from './EventHooks';
import EventSignups from './EventSignups';

const defaultMe = { id: 0, name: '', bio: '' };

export default function EventInterestForm() {
	const event = useMutableEvent();
	const me = useMe() || defaultMe;
	const placeIdRef = useRef<string | null>(null);
	const canDriveRef = useRef(false);
	const [note, setNote] = useState('');
	const [noteSaved, setNoteSaved] = useState(true);
	const noteUpdateTimerRef = useRef<NodeJS.Timeout | null>(null);

	{
		const signup = event.signups[me.id];

		useEffect(() => {
			placeIdRef.current = signup?.placeId ?? null;
			canDriveRef.current = signup?.canDrive ?? false;
		}, [signup?.canDrive, signup?.placeId]);

		useEffect(() => {
			setNote(signup?.note || '');
		}, [signup?.note]);
	}

	const updateSignup = useCallback(
		async (note: string) => {
			const placeId = placeIdRef.current;
			const canDrive = canDriveRef.current;

			await addOrUpdateEventSignup(
				event.id,
				placeIdRef.current,
				canDrive,
				note
			);

			if (placeId) {
				const details = await getPlaceDetails(placeId);

				event.signups[me.id] = {
					user: me,
					placeId,
					...details,
					canDrive,
					note,
				};
			} else {
				event.signups[me.id] = {
					user: me,
					placeId: null,
					latitude: null,
					longitude: null,
					formattedAddress: null,
					canDrive,
					note,
				};
			}
		},
		[event.id, event.signups, me]
	);

	const removeSignup = useCallback(async () => {
		await removeEventSignup(event.id);

		if (event.signups[me.id]) {
			delete event.signups[me.id];
		}
	}, [event.id, event.signups, me.id]);

	const updateNote = useCallback(
		(newNote: string) => {
			setNote(newNote);
			setNoteSaved(false);
			if (noteUpdateTimerRef.current) {
				clearTimeout(noteUpdateTimerRef.current);
			}
			noteUpdateTimerRef.current = setTimeout(() => {
				updateSignup(newNote).then(() => setNoteSaved(true));
			}, 1000);
		},
		[updateSignup]
	);

	const interested = !!event.signups[me.id];

	const canDrive = !!event.signups[me.id]?.canDrive;

	return (
		<>
			<span style={{ fontSize: '0.875em' }}>Click to toggle your interest</span>
			<UIButton
				onClick={
					interested
						? () => removeSignup()
						: () => {
								placeIdRef.current = null;
								updateSignup(note);
						  }
				}
				style={{
					backgroundColor: interested ? green : lightgrey,
					color: interested ? 'white' : 'black',
					transition: 'color 0.2s, background-color 0.2s',
				}}
			>
				{interested ? 'Leave event' : 'Join event'}
			</UIButton>
			{interested && (
				<>
					<span style={{ fontSize: '0.875em' }}>
						Click to toggle your driving availability
					</span>
					<UIButton
						onClick={() => {
							canDriveRef.current = !canDriveRef.current;
							updateSignup(note);
						}}
						style={{
							backgroundColor: canDrive ? green : lightgrey,
							color: canDrive ? 'white' : 'black',
							transition: 'color 0.2s, background-color 0.2s',
						}}
					>
						{canDrive ? 'Can drive' : "Can't drive"}
					</UIButton>
					<span style={{ fontSize: '0.875em' }}>
						Your pickup/dropoff location lets you see who would add the least
						driving distance. It's only visible to members of your carpool. As
						an alternative, you could write your general location in the note
						section, such as "Chantilly".
					</span>
					<UIPlacesAutocomplete
						placeholder="Pickup and dropoff location"
						onSelected={(_address, placeId) => {
							placeIdRef.current = placeId;
							updateSignup(note);
						}}
						style={
							event.signups[me.id]?.placeId != null
								? { border: '2px solid ' + green }
								: {}
						}
						placeId={event.signups[me.id]?.placeId}
					/>
					<br />
					<span style={{ fontSize: '0.875em' }}>
						Note (e.g. "Monday, Tuesday, Wednesday")
					</span>
					<UITextInput
						value={note}
						onChangeText={updateNote}
						style={noteSaved ? { border: '2px solid ' + green } : {}}
					/>
					<br />
					<EventCarpools />
					{event.signups !== null && <EventSignups />}
				</>
			)}
		</>
	);
}
