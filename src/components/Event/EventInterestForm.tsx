import { useCallback } from 'react';
import { green, lightgrey } from '../../lib/colors';
import getPlaceDetails from '../../lib/getPlaceDetails';
import { addOrUpdateEventSignup, removeEventSignup } from '../api';
import { useMe } from '../hooks';
import UIButton from '../UI/UIButton';
import UIPlacesAutocomplete from '../UI/UIPlacesAutocomplete';
import EventCarpools from './EventCarpools';
import { useMutableEvent } from './EventHooks';
import EventSignups from './EventSignups';

export default function EventInterestForm() {
	const event = useMutableEvent();
	const me = useMe() || { id: 0, name: '' };

	const updateSignup = useCallback(
		async (placeId: string | null) => {
			await addOrUpdateEventSignup(event.id, placeId);

			if (placeId) {
				const details = await getPlaceDetails(placeId);

				event.signups[me.id] = {
					user: { id: me.id, name: me.name },
					placeId,
					...details,
				};
			} else {
				event.signups[me.id] = {
					user: { id: me.id, name: me.name },
					placeId: null,
					latitude: null,
					longitude: null,
					formattedAddress: null,
				};
			}
		},
		[event.id, event.signups, me.id, me.name]
	);

	const removeSignup = useCallback(async () => {
		await removeEventSignup(event.id);

		if (event.signups[me.id]) {
			delete event.signups[me.id];
		}
	}, [event.id, event.signups, me.id]);

	const interested = !!event.signups[me.id];

	return (
		<>
			<UIButton
				onClick={interested ? () => removeSignup() : () => updateSignup(null)}
				style={{
					backgroundColor: interested ? green : lightgrey,
					color: interested ? 'white' : 'black',
					transition: 'color 0.2s, background-color 0.2s',
				}}
			>
				{interested ? 'Interested' : 'Not interested'}
			</UIButton>
			{interested && (
				<>
					<UIPlacesAutocomplete
						placeholder="Pickup and dropoff location"
						onSelected={(_address, placeId) => {
							updateSignup(placeId);
						}}
						style={
							event.signups[me.id]?.placeId != null
								? { border: '2px solid ' + green }
								: {}
						}
						placeId={event.signups[me.id]?.placeId}
					/>
					<br />
					<EventCarpools />
					{event.signups !== null && <EventSignups />}
				</>
			)}
		</>
	);
}
