import { useCallback, useEffect, useRef, useState } from 'react';
import {
	addOrUpdateEventSignup,
	getEventSignups,
	removeEventSignup,
} from '../api';
import { green, lightgrey } from '../colors';
import { useMe } from '../hooks';
import { IEvent, IEventSignup } from '../types';
import UIButton from '../UI/UIButton';
import UILink from '../UI/UILink';
import UIPlacesAutocomplete from '../UI/UIPlacesAutocomplete';
import UISecondaryBox from '../UI/UISecondaryBox';
import UISecondaryHeader from '../UI/UISecondaryHeader';
import useThrottle from '../useThrottle';
import EventCarpools from './EventCarpools';
import EventDetails from './EventDetails';
import EventSignups from './EventSignups';

function GroupName({ group }: { group: IEvent['group'] }) {
	return <UILink href={`/groups/${group.id}`}>{group.name}</UILink>;
}

export default function Event({ event }: { event: IEvent }) {
	const { name, group, formattedAddress, startTime, endTime } = event;
	const [placeId, setPlaceId] = useState<string | null>(null);
	const [interested, setInterested] = useState(false);
	const [updating, setUpdating] = useState(false);
	const [signups, setSignups] = useState<IEventSignup[] | null>(null);
	const toggleInterested = useCallback(() => setInterested((i) => !i), []);
	const toggleInterestedThrottled = useThrottle(toggleInterested, 500);
	const existingSignup = useRef({
		interested: false,
		placeId: null as string | null,
		eventId: null as number | null,
	});
	const me = useMe();

	useEffect(() => {
		if (signups === null) {
			return;
		}

		const removeSignup = () => {
			if (prev.interested) {
				removeEventSignup(event.id)
					.then(() => {
						prev.interested = false;
					})
					.finally(() => setUpdating(false));
			}
		};

		const addOrUpdateSignup = () => {
			if (!prev.interested || prev.placeId !== placeId) {
				console.log('Adding or updating signup.', prev, {
					interested,
					placeId,
					eventId: event.id,
					signups,
				});
				addOrUpdateEventSignup(event.id, placeId)
					.then(() => {
						prev.placeId = placeId;
						prev.eventId = event.id;
						prev.interested = true;
					})
					.finally(() => setUpdating(false));
			}
		};

		const prev = existingSignup.current;

		if (!interested) {
			removeSignup();
		} else {
			addOrUpdateSignup();
		}
	}, [event.id, interested, placeId, signups, updating]);

	useEffect(() => {
		getEventSignups(event.id)
			.then((signups) => {
				for (let signup of signups) {
					if (signup.user.id === me?.id) {
						setInterested(true);
						setPlaceId(signup.placeId);
						existingSignup.current.eventId = event.id;
						existingSignup.current.placeId = signup.placeId;
						existingSignup.current.interested = true;
					}
				}
				setSignups(signups);
			})
			.catch(console.error);
	}, [event.id, me?.id]);

	return (
		<UISecondaryBox>
			<div style={{ textAlign: 'center' }}>
				<UISecondaryHeader>{name}</UISecondaryHeader>
				<GroupName group={group} />
			</div>
			<EventDetails {...{ startTime, endTime, formattedAddress }} />
			<UIButton
				onClick={toggleInterestedThrottled}
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
						onSelected={(_address, placeID) => {
							setPlaceId(placeID);
						}}
						style={placeId != null ? { border: '2px solid ' + green } : {}}
						placeId={placeId}
					/>
					<br />
					<EventCarpools event={event} />
					{signups !== null && (
						<EventSignups event={event} myPlaceId={placeId} signups={signups} />
					)}
				</>
			)}
		</UISecondaryBox>
	);
}
