import { useCallback, useEffect } from 'react';
import { green, lightgrey } from '../../lib/colors';
import getPlaceDetails from '../../lib/getPlaceDetails';
import {
	addOrUpdateEventSignup,
	getEvent,
	getEventSignups,
	removeEventSignup,
} from '../api';
import { useMe } from '../hooks';
import { IEvent, IEventSignup } from '../types';
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

const NOT_LOADED = {};

export default function Event({
	id,
	initial,
}: {
	id: number;
	initial?: IEvent;
}) {
	const [event, setEvent] = useImmutable<IEvent | null>({
		id,
		name: '',
		group: {
			id: 0,
			name: '',
		},
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
	const [signups, setSignups] =
		useImmutable<Record<string, IEventSignup>>(NOT_LOADED);

	const me = useMe()!;

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

				signups[me.id] = {
					user: { id: me.id, name: me.name },
					placeId,
					...details,
				};
			} else {
				signups[me.id] = {
					user: { id: me.id, name: me.name },
					placeId: null,
					latitude: null,
					longitude: null,
					formattedAddress: null,
				};
			}
		},
		[id, me.id, me.name, signups]
	);

	const removeSignup = useCallback(async () => {
		await removeEventSignup(id);

		if (signups[me.id]) {
			delete signups[me.id];
		}
	}, [id, me.id, signups]);

	const interested = !!signups[me.id];

	useEffect(() => {
		getEventSignups(id)
			.then((signups) => {
				const signupMap: Record<string, IEventSignup> = {};
				for (let signup of signups) {
					signupMap[signup.user.id] = signup;
				}
				setSignups(signupMap);
			})
			.catch(console.error);
	}, [id, setSignups]);

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
				signups,
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
								signups[me.id]?.placeId != null
									? { border: '2px solid ' + green }
									: {}
							}
							placeId={signups[me.id]?.placeId}
						/>
						<br />
						<EventCarpools />
						{signups !== null && <EventSignups />}
					</>
				)}
			</UISecondaryBox>
		</EventContext.Provider>
	);
}
