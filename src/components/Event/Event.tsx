import * as immutable from 'immutable';
import { useCallback, useEffect, useRef, useState } from 'react';
import { green, lightgrey } from '../../lib/colors';
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
import useThrottle from '../useThrottle';
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
	const [event, setEvent] = useState<IEvent | null>(initial || null);
	const [myPlaceId, setPlaceId] = useState<string | null>(null);
	const [interested, setInterested] = useState(false);
	const [updating, setUpdating] = useState(false);
	const [signups, setSignups] =
		useState<Record<string, IEventSignup>>(NOT_LOADED);
	const [hasCarpool, setHasCarpool] = useState(false);
	const toggleInterested = useCallback(() => setInterested((i) => !i), []);
	const toggleInterestedThrottled = useThrottle(toggleInterested, 500);
	const existingSignup = useRef({
		interested: false,
		placeId: null as string | null,
		eventId: null as number | null,
	});
	const me = useMe();

	const [tentativeInvites, setTentativeInvites] = useState(
		immutable.Set<number>()
	);

	const addTentativeInvite = useCallback((userId: number) => {
		setTentativeInvites((t) => t.add(userId));
	}, []);

	const removeTentativeInvite = useCallback((userId: number) => {
		setTentativeInvites((t) => t.delete(userId));
	}, []);

	const refresh = useCallback(() => {
		getEvent(id).then(setEvent);
	}, [id]);

	useEffect(refresh, [refresh]);

	useEffect(() => {
		if (signups === NOT_LOADED) {
			return;
		}

		const removeSignup = () => {
			if (prev.interested) {
				removeEventSignup(id)
					.then(() => {
						prev.interested = false;
					})
					.finally(() => setUpdating(false));
			}
		};

		const addOrUpdateSignup = () => {
			if (!prev.interested || prev.placeId !== myPlaceId) {
				console.log('Adding or updating signup.', prev, {
					interested,
					placeId: myPlaceId,
					eventId: id,
					signups,
				});
				addOrUpdateEventSignup(id, myPlaceId)
					.then(() => {
						prev.placeId = myPlaceId;
						prev.eventId = id;
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
	}, [id, interested, myPlaceId, signups, updating]);

	useEffect(() => {
		getEventSignups(id)
			.then((signups) => {
				for (let signup of signups) {
					if (signup.user.id === me?.id) {
						setInterested(true);
						setPlaceId(signup.placeId);
						existingSignup.current.eventId = id;
						existingSignup.current.placeId = signup.placeId;
						existingSignup.current.interested = true;
					}
				}
				const signupMap: Record<string, IEventSignup> = {};
				for (let signup of signups) {
					signupMap[signup.user.id] = signup;
				}
				setSignups(signupMap);
			})
			.catch(console.error);
	}, [id, me?.id]);

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
				addTentativeInvite,
				removeTentativeInvite,
				tentativeInvites,
				signups,
				hasCarpool,
				setHasCarpool,
				myPlaceId,
			}}
		>
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
							style={myPlaceId != null ? { border: '2px solid ' + green } : {}}
							placeId={myPlaceId}
						/>
						<br />
						<EventCarpools />
						{signups !== null && <EventSignups myPlaceId={myPlaceId} />}
					</>
				)}
			</UISecondaryBox>
		</EventContext.Provider>
	);
}
