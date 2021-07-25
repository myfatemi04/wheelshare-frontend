import { useCallback, useEffect, useRef } from 'react';
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
	const placeIdRef = useRef<string | null>(null);
	const canDriveRef = useRef(false);

	{
		const signup = event.signups[me.id];

		useEffect(() => {
			placeIdRef.current = signup?.placeId ?? null;
			canDriveRef.current = signup?.canDrive ?? false;
		}, [signup?.canDrive, signup?.placeId]);
	}

	const updateSignup = useCallback(async () => {
		const placeId = placeIdRef.current;
		const canDrive = canDriveRef.current;

		await addOrUpdateEventSignup(event.id, placeIdRef.current, canDrive);

		if (placeId) {
			const details = await getPlaceDetails(placeId);

			event.signups[me.id] = {
				user: { id: me.id, name: me.name },
				placeId,
				...details,
				canDrive,
			};
		} else {
			event.signups[me.id] = {
				user: { id: me.id, name: me.name },
				placeId: null,
				latitude: null,
				longitude: null,
				formattedAddress: null,
				canDrive,
			};
		}
	}, [event.id, event.signups, me.id, me.name]);

	const removeSignup = useCallback(async () => {
		await removeEventSignup(event.id);

		if (event.signups[me.id]) {
			delete event.signups[me.id];
		}
	}, [event.id, event.signups, me.id]);

	const interested = !!event.signups[me.id];

	const canDrive = !!event.signups[me.id]?.canDrive;

	return (
		<>
			<UIButton
				onClick={
					interested
						? () => removeSignup()
						: () => {
								placeIdRef.current = null;
								updateSignup();
						  }
				}
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
					<UIButton
						onClick={() => {
							canDriveRef.current = !canDriveRef.current;
							updateSignup();
						}}
						style={{
							backgroundColor: canDrive ? green : lightgrey,
							color: canDrive ? 'white' : 'black',
							transition: 'color 0.2s, background-color 0.2s',
						}}
					>
						{canDrive ? 'Can drive' : "Can't drive"}
					</UIButton>
					<UIPlacesAutocomplete
						placeholder="Pickup and dropoff location"
						onSelected={(_address, placeId) => {
							placeIdRef.current = placeId;
							updateSignup();
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
