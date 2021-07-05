import { useCallback, useEffect, useRef, useState } from 'react';
import { addEventSignup, getEventSignups, removeEventSignup } from './api';
import { green, lightgrey } from './colors';
import { useMe } from './hooks';
import latlongdist, { R_miles } from './latlongdist';
import UIButton from './UIButton';
import UIPlacesAutocomplete from './UIPlacesAutocomplete';
import UISecondaryBox from './UISecondaryBox';
import UISecondaryHeader from './UISecondaryHeader';
import usePlace from './usePlace';
import useThrottle from './useThrottle';
import useToggle from './useToggle';

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

function formatStartAndEndTime(
	startDatetimeString: string,
	endDatetimeString: string
) {
	const startDatetime = new Date(startDatetimeString);
	const endDatetime = new Date(endDatetimeString);

	if (isNaN(startDatetime.valueOf())) {
		console.error('Invalid datetime:', startDatetimeString);
		return '(invalid)';
	}
	if (isNaN(endDatetime.valueOf())) {
		console.error('Invalid datetime:', startDatetimeString);
		return '(invalid)';
	}

	const startDateString = startDatetime.toLocaleDateString();
	const endDateString = endDatetime.toLocaleDateString();

	if (startDateString === endDateString) {
		const startTimeString = startDatetime.toLocaleTimeString();
		const endTimeString = endDatetime.toLocaleTimeString();
		return `${startDateString}, ${startTimeString} - ${endTimeString}`;
	} else {
		return `${startDatetime.toLocaleString()} - ${endDatetime.toLocaleString()}`;
	}
}

function GroupName({ name }: { name: string }) {
	return (
		<span
			style={{
				color: '#303030',
				textAlign: 'center',
			}}
		>
			{name}
		</span>
	);
}

function Details({
	startTime,
	endTime,
	formattedAddress,
}: {
	startTime: string;
	endTime: string;
	formattedAddress: string;
}) {
	return (
		<div
			style={{
				marginTop: '0.5rem',
				textAlign: 'left',
			}}
		>
			<span
				style={{
					color: '#303030',
				}}
			>
				<b>When: </b>
				{formatStartAndEndTime(startTime, endTime)}
			</span>
			<br />
			<br />
			<span
				style={{
					color: '#303030',
				}}
			>
				<b>Where: </b>
				{formattedAddress}
			</span>
		</div>
	);
}

export type ICarpool = {
	driver: {
		id: number;
		name: string;
	};
	startTime: string;
	endTime: string;
	extraDistance: number;
};

function CarpoolRow({ carpool }: { carpool: ICarpool }) {
	const PADDING = '1rem';
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				position: 'relative',
				padding: PADDING,
				borderRadius: '0.5rem',
				border: '1px solid #e0e0e0',
				marginTop: '0.5rem',
				marginBottom: '0.5rem',
			}}
		>
			<div>
				<span style={{ fontWeight: 500 }}>{carpool.driver.name}</span>
				<br />
				Time:{' '}
				<b>
					{carpool.startTime} - {carpool.endTime}
				</b>
				<br />
				Offset from route: <b>{carpool.extraDistance} miles</b>
			</div>
			<div
				style={{
					borderRadius: '0.5em',
					cursor: 'pointer',
					padding: '0.5em',
					position: 'absolute',
					right: PADDING,
					userSelect: 'none',
					backgroundColor: '#e0e0e0',
				}}
			>
				Request to join
			</div>
		</div>
	);
}

const dummyCarpoolData: ICarpool[] = [
	{
		driver: {
			id: 0,
			name: 'Michael Fatemi',
		},
		startTime: '10:00',
		endTime: '10:10',
		extraDistance: 6.9,
	},
	{
		driver: {
			id: 1,
			name: 'Joshua Hsueh',
		},
		startTime: '10:05',
		endTime: '10:10',
		extraDistance: 420,
	},
];
function Carpools({ event }: { event: IEvent }) {
	// eslint-disable-next-line
	const [carpools, _setCarpools] = useState(dummyCarpoolData);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h3 style={{ marginBlockEnd: '0' }}>Carpools</h3>
			{carpools.map((carpool) => (
				<CarpoolRow carpool={carpool} key={carpool.driver.id} />
			))}
		</div>
	);
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

function Signups({
	event,
	signups,
	myPlaceId,
}: {
	event: IEvent;
	signups: IEventSignup[];
	myPlaceId: string | null;
}) {
	const PADDING = '1rem';
	const placeDetails = usePlace(myPlaceId);
	const locationLongitude = event.latitude;
	const locationLatitude = event.longitude;
	const me = useMe();

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h3 style={{ marginBlockEnd: '0' }}>People</h3>
			{signups.map(({ latitude, longitude, user }) => {
				if (user.id === me?.id) {
					return null;
				}
				let extraDistance = null;
				if (placeDetails != null) {
					const myLatitude = placeDetails.latitude;
					const myLongitude = placeDetails.longitude;
					const meToThem = latlongdist(
						latitude,
						longitude,
						locationLongitude,
						locationLatitude,
						R_miles
					);
					const themToLocation = latlongdist(
						latitude,
						longitude,
						myLatitude,
						myLongitude,
						R_miles
					);
					const totalWithThem = meToThem + themToLocation;
					const totalWithoutThem = latlongdist(
						locationLongitude,
						locationLatitude,
						myLatitude,
						myLongitude,
						R_miles
					);
					extraDistance = totalWithThem - totalWithoutThem;
				}

				return (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							position: 'relative',
							padding: '1rem',
							borderRadius: '0.5rem',
							border: '1px solid #e0e0e0',
							marginTop: '0.5rem',
							marginBottom: '0.5rem',
						}}
						key={user.id}
					>
						<b>{user.name}</b>
						{extraDistance ? `: +${extraDistance.toFixed(1)} miles` : ''}
						<div
							style={{
								borderRadius: '0.5em',
								cursor: 'pointer',
								padding: '0.5em',
								position: 'absolute',
								right: PADDING,
								userSelect: 'none',
								backgroundColor: '#e0e0e0',
							}}
						>
							Invite to carpool
						</div>
					</div>
				);
			})}
		</div>
	);
}

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

		const addSignup = () => {
			if (!prev.interested) {
				addEventSignup(event.id, placeId!)
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
		} else if (placeId == null) {
			removeSignup();
		} else {
			addSignup();
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
			<Details {...{ startTime, endTime, formattedAddress }} />
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
					<Carpools event={event} />
					<Signups event={event} myPlaceId={placeId} signups={signups} />
				</>
			)}
		</UISecondaryBox>
	);
}
