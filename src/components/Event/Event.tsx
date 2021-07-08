import { useCallback, useEffect, useRef, useState } from 'react';
import {
	addOrUpdateEventSignup,
	getEventSignups,
	removeEventSignup,
} from '../api';
import { green, lightgrey } from '../colors';
import { useMe } from '../hooks';
import UIButton from '../UI/UIButton';
import UIPlacesAutocomplete from '../UI/UIPlacesAutocomplete';
import UISecondaryBox from '../UI/UISecondaryBox';
import UISecondaryHeader from '../UI/UISecondaryHeader';
import useThrottle from '../useThrottle';
import useToggle from '../useToggle';
import EventCarpools from './EventCarpools';
import EventDetails from './EventDetails';
import EventSignups from './EventSignups';

export type IEvent = {
	id: number;
	name: string;
	group: string;
	formattedAddress: string;
	startTime: string;
	endTime: string;
	latitude: number;
	longitude: number;
};

function GroupName({ name }: { name: string }) {
	return <span style={{ color: '#303030', textAlign: 'center' }}>{name}</span>;
}

export type IEventSignup = {
	user: {
		id: number;
		name: number;
	};
	placeId: string;
	formattedAddress: string;
	latitude: number;
	longitude: number;
};

export default function Event({ event }: { event: IEvent }) {
	const { name, group, formattedAddress, startTime, endTime } = event;
	const [haveRide, toggleHaveRide] = useToggle(false);
	const [placeId, setPlaceId] = useState<string | null>(null);
	const [interested, setInterested] = useState(false);
	const [updating, setUpdating] = useState(false);
	const [signups, setSignups] = useState<IEventSignup[]>([]);
	const toggleInterested = useCallback(() => setInterested((i) => !i), []);
	const toggleInterestedThrottled = useThrottle(toggleInterested, 500);
	const existingSignup = useRef({
		interested: false,
		placeId: null as string | null,
		eventId: null as number | null,
	});
	const me = useMe();

	useEffect(() => {
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
			if (!prev.interested) {
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
	}, [event.id, interested, placeId, updating]);

	useEffect(() => {
		getEventSignups(event.id)
			.then((signups) => {
				setSignups(signups);
				for (let signup of signups) {
					if (signup.user.id === me?.id) {
						setInterested(true);
						existingSignup.current.eventId = event.id;
						existingSignup.current.placeId = signup.placeId;
						existingSignup.current.interested = true;
					}
				}
			})
			.catch(console.error);
	}, [event.id, me?.id]);

	return (
		<UISecondaryBox>
			<UISecondaryHeader>{name}</UISecondaryHeader>
			<GroupName name={group} />
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
					/>
					{false && (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
								userSelect: 'none',
							}}
							onClick={toggleHaveRide}
						>
							<input
								type="checkbox"
								style={{
									borderRadius: '0.5em',
									width: '2em',
									height: '2em',
									margin: '1em',
								}}
								checked={haveRide}
							/>
							I don't have any way to get there yet
						</div>
					)}
					<EventCarpools event={event} />
					<EventSignups event={event} myPlaceId={placeId} signups={signups} />
				</>
			)}
		</UISecondaryBox>
	);
}
