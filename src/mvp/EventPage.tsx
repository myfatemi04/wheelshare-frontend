import { Map, Marker, Polyline } from 'google-maps-react';
import { useEffect } from 'react';
import { useCallback, useContext, useMemo, useState } from 'react';
import UIButton from '../components/UI/UIButton';
import UIPlacesAutocomplete from '../components/UI/UIPlacesAutocomplete';
import UIPressable from '../components/UI/UIPressable';
import getDistance from '../lib/getdistance';
import {
	distanceAddedByWaypoint,
	estimateOptimalWaypointOrder,
} from './routeOptimization';
import { Signup } from './types';
import WheelShareContext from './WheelShareContext';

function ll(x: { latitude: number; longitude: number }) {
	return { lat: x.latitude, lng: x.longitude };
}

// eslint-disable-next-line
const markerColors = [
	'blue',
	'green',
	'lightblue',
	'orange',
	'pink',
	'purple',
	'red',
	'yellow',
];

export default function EventPage() {
	const ctx = useContext(WheelShareContext);
	const api = ctx.api;
	const event = ctx.event!;

	const [map, setMap] = useState<google.maps.Map<Element>>();

	const signupsWithoutCarpool = useMemo(() => {
		const signups = event?.signups ?? [];
		const users: Signup[] = [];
		for (let signup of Object.values(signups)) {
			if (signup.groupId === null) {
				users.push(signup);
			}
		}
		return users;
	}, [event?.signups]);

	const mySignupId = event.me.signupId;
	const mySignup = event.signups[mySignupId];
	const currentPlaceId = mySignup.placeId;

	const myLatLng = mySignup.latitude ? ll(mySignup) : undefined;

	const canDrive = event.me.driving;

	const myCarpoolExtraInfo = event.me.carpool;
	const myCarpool = myCarpoolExtraInfo
		? event.carpools.find(
				(carpool) => carpool.groupId === myCarpoolExtraInfo.groupId
		  )!
		: null;

	const myCarpoolHasOtherMembers = myCarpool && myCarpool.signupIds.length > 1;

	const focusMany = useCallback(
		(locations: google.maps.LatLngLiteral[]) => {
			const bounds = new google.maps.LatLngBounds();
			for (let location of locations) {
				bounds.extend(location);
			}
			map?.fitBounds(bounds);
		},
		[map]
	);

	const focus = useCallback(
		(signupId: string) => {
			const highlightedSignup = event.signups[signupId];
			const highlightedSignupLocation = highlightedSignup.latitude
				? ll(highlightedSignup)
				: undefined;

			if (highlightedSignupLocation) {
				map?.setCenter(highlightedSignupLocation);
				map?.setZoom(14);
			}
		},
		[event, map]
	);

	const [invitedSignupIds, setInvitedSignupIds] = useState<
		Record<string, boolean>
	>({});

	const invitedSignups = useMemo(
		() => Object.keys(invitedSignupIds).map((id) => event.signups[id]),
		[event.signups, invitedSignupIds]
	);

	const optimalInvitedSignupPath = useMemo(() => {
		if (!mySignup || !mySignup.latitude) {
			return null;
		}

		const invitedSignupsWithLocation = invitedSignups.filter(
			(signup) => signup.latitude
		);

		const path = estimateOptimalWaypointOrder({
			from: mySignup,
			// @ts-ignore
			waypoints: invitedSignupsWithLocation,
			to: event,
		});

		return path;
	}, [event, invitedSignups, mySignup]);

	useEffect(() => {
		if (optimalInvitedSignupPath && event.latitude && mySignup.latitude) {
			focusMany([
				ll(event),
				ll(mySignup),
				...optimalInvitedSignupPath.path.waypoints.map(ll),
			]);
		}
	}, [event, focusMany, mySignup, optimalInvitedSignupPath]);

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<h1>{event.name}</h1>
			<Map
				onReady={(_props, map) => setMap(map)}
				containerStyle={{
					width: '30rem',
					height: '25rem',
					position: 'relative',
					borderRadius: '0.5rem',
					overflow: 'hidden',
				}}
				google={window.google}
				style={{ width: '100%', height: '100%' }}
				centerAroundCurrentLocation
			>
				{invitedSignups.length > 0 &&
					mySignup.latitude &&
					optimalInvitedSignupPath && (
						<Polyline
							path={[
								ll(mySignup),
								...optimalInvitedSignupPath.path.waypoints.map(ll),
								ll(event),
							]}
						/>
					)}

				<Marker key="event" position={ll(event)} icon="/markers/green.png" />
				{myLatLng && (
					<Marker key="me" position={myLatLng} icon="/markers/red.png" />
				)}
				{Object.entries(event.signups).map(([id, signup]) => {
					if (id === mySignupId) {
						return null;
					}
					if (signup && signup.latitude) {
						return (
							<Marker
								key={id}
								position={{ lat: signup.latitude, lng: signup.longitude }}
								onClick={() => focus(id)}
								icon={
									id in invitedSignupIds
										? '/markers/lightblue.png'
										: '/markers/yellow.png'
								}
							/>
						);
					}

					return null;
				})}
			</Map>
			<br />
			<div
				style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
			>
				<div>
					My location
					<UIPlacesAutocomplete
						placeId={currentPlaceId}
						onSelected={(address, placeId) => {
							api.joinEvent(placeId);
						}}
						style={{
							border: '2px solid ' + (currentPlaceId ? '#30ff30' : 'gray'),
							marginRight: '0.5rem',
						}}
					/>
				</div>
				{!myCarpoolHasOtherMembers && (
					<div>
						Can I drive?
						<UIButton
							onClick={() => {
								if (canDrive) {
									setInvitedSignupIds({});
									api.setDriving(false);
								} else {
									api.setDriving(true);
								}
							}}
							style={{ border: '2px solid #30ff00' }}
						>
							{canDrive ? 'Yes' : 'No'}
						</UIButton>
					</div>
				)}
			</div>
			{myCarpoolHasOtherMembers && (
				<>
					<h2>My Carpool</h2>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							border: '1px solid black',
							width: '30rem',
							padding: '1rem',
						}}
					>
						<span>
							<b>Driver: </b>
							{myCarpool?.driverName}
						</span>
						<b>Members: </b>
						{myCarpoolExtraInfo!.members.length > 1 ? (
							<ul>
								{myCarpoolExtraInfo!.members.map((member) => {
									if (member.signupId === event.me.signupId) {
										return null;
									}
									const signup = event.signups[member.signupId];
									const name = member.name;
									return (
										<li key={signup.id}>
											<b>{name}</b>
										</li>
									);
								})}
							</ul>
						) : (
							<>(no members)</>
						)}
					</div>
				</>
			)}
			{canDrive && (
				<>
					<h2>People who need a ride</h2>
					<span>
						{invitedSignups.length === 1
							? '1 person'
							: `${invitedSignups.length} people`}{' '}
						in temporary carpool. Estimated distance (linear):{' '}
						{optimalInvitedSignupPath?.distance.toFixed(1)} miles
					</span>
					<br />

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							width: '20rem',
						}}
					>
						{signupsWithoutCarpool.map((signup, index) => {
							// Don't show people who don't have a location
							if (!signup.latitude) {
								return null;
							}

							const name = 'Person ' + (index + 1);
							const distanceAdded = (() => {
								if (signup.id in invitedSignupIds) {
									return null;
								}
								if (optimalInvitedSignupPath) {
									return distanceAddedByWaypoint(
										optimalInvitedSignupPath.path,
										signup
									);
								}
								if (signup.latitude && mySignup.latitude) {
									let distanceWithThem = getDistance(mySignup, signup, event);
									let distanceWithoutThem = getDistance(mySignup, event);
									return distanceWithThem - distanceWithoutThem;
								}
								return null;
							})();
							const invited = signup.id in invitedSignupIds;
							return (
								<div key={signup.id} style={{ marginBottom: '0.5rem' }}>
									<b>{name}</b> has no carpool.{' '}
									{distanceAdded !== null && (
										<>+{distanceAdded.toFixed(1)} miles</>
									)}{' '}
									<div style={{ display: 'flex' }}>
										<UIPressable
											onClick={() => focus(signup.id)}
											style={{ marginRight: '0.5rem' }}
										>
											View on map
										</UIPressable>
										{!invited ? (
											<UIPressable
												onClick={() =>
													setInvitedSignupIds((ids) => ({
														...ids,
														[signup.id]: true,
													}))
												}
											>
												Add
											</UIPressable>
										) : (
											<UIPressable
												onClick={() => {
													setInvitedSignupIds((ids) => {
														const newIds = { ...ids };
														delete newIds[signup.id];
														return newIds;
													});
												}}
											>
												Remove
											</UIPressable>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</>
			)}
			<h2>Carpools</h2>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					border: '1px solid black',
					width: '30rem',
					padding: '1rem',
				}}
			>
				{event.carpools.map((carpool) => {
					const isMe = carpool.groupId === mySignup.groupId;
					const driverDisplayName = isMe
						? carpool.driverName + ' (my group)'
						: carpool.driverName;

					const passengerCount = carpool.signupIds.length - 1;

					if (passengerCount === 0) {
						return (
							<span key={carpool.groupId}>
								{driverDisplayName}: Available to drive
							</span>
						);
					}

					return (
						<span key={carpool.groupId}>
							{driverDisplayName}: Driving
							<br />
							{passengerCount} member
							{passengerCount !== 1 ? 's' : ''}
						</span>
					);
				})}
			</div>
		</div>
	);
}
