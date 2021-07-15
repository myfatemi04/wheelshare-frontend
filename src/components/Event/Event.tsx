import { useCallback, useEffect } from 'react';
import { green, lightgrey } from '../../lib/colors';
import getPlaceDetails from '../../lib/getPlaceDetails';
import { addOrUpdateEventSignup, getEvent, removeEventSignup } from '../api';
import { useMe } from '../hooks';
import { IEvent } from '../types';
import UIButton from '../UI/UIButton';
import UILink from '../UI/UILink';
import UIPlacesAutocomplete from '../UI/UIPlacesAutocomplete';
import UISecondaryBox from '../UI/UISecondaryBox';
import UISecondaryHeader from '../UI/UISecondaryHeader';
import useImmutable from '../useImmutable';
import EventCarpools from './EventCarpools';
import EventContext from './EventContext';
import EventDetails from './EventDetails';
import EventSignups from './EventSignups';

function GroupName({ group }: { group: IEvent['group'] }) {
	return <UILink href={`/groups/${group.id}`}>{group.name}</UILink>;
}

export default function Event({
	id,
	initial,
}: {
	id: number;
	initial?: IEvent;
}) {
	const [event, setEvent] = useImmutable<IEvent>({
		id,
		name: '',
		group: {
			id: 0,
			name: '',
		},
		signups: {},
		carpools: [],
		startTime: '',
		endTime: '',
		daysOfWeek: 0,
		placeId: '',
		formattedAddress: '',
		latitude: 0,
		longitude: 0,
		duration: 0,
		...(initial || {}),
	});

	const me = useMe() || { id: 0, name: '' };

	const [tentativeInvites] = useImmutable<Record<number, boolean>>({});

	const refresh = useCallback(() => {
		getEvent(id).then(setEvent);
	}, [id, setEvent]);

	useEffect(refresh, [refresh]);

	const updateSignup = useCallback(
		async (placeId: string | null) => {
			await addOrUpdateEventSignup(id, placeId);

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
		[event.signups, id, me.id, me.name]
	);

	const removeSignup = useCallback(async () => {
		await removeEventSignup(id);

		if (event.signups[me.id]) {
			delete event.signups[me.id];
		}
	}, [id, me.id, event.signups]);

	const interested = !!event.signups[me.id];

	if (!event) {
		return <UISecondaryBox>Loading...</UISecondaryBox>;
	}

	const { name, group, formattedAddress, startTime, endTime } = event;

	return (
		<EventContext.Provider
			value={{
				event,
				refresh,
				default: false,
				tentativeInvites,
			}}
		>
			<UISecondaryBox>
				<div style={{ textAlign: 'center' }}>
					<UISecondaryHeader>{name}</UISecondaryHeader>
					{group && <GroupName group={group} />}
				</div>
				<EventDetails {...{ startTime, endTime, formattedAddress }} />
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
			</UISecondaryBox>
		</EventContext.Provider>
	);
}
