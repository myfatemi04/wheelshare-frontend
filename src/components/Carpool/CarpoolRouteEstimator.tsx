import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Location } from '../../lib/estimateoptimalpath';
import getDistance from '../../lib/getdistance';
import { getEventSignupsBulk } from '../api';
import { IEventSignupComplete, IEventSignup } from '../types';
import useOptimalPath from '../useOptimalPath';
import { CarpoolContext } from './Carpool';

function useSignups(eventId: number, userIds: number[]) {
	// Fetchs bulk signups from the API for the given event and user ids
	// and returns a memoized result.

	const [signups, setSignups] = useState<IEventSignup[]>([]);

	useEffect(() => {
		getEventSignupsBulk(eventId, userIds).then((signups) => {
			setSignups(signups);
		});
	}, [eventId, userIds]);

	return signups;
}

export default function CarpoolRouteEstimator() {
	const { carpool } = useContext(CarpoolContext);
	const { members } = carpool;

	const memberIds = useMemo(
		() => members.map((member) => member.id),
		[members]
	);

	const signups = useSignups(carpool.event.id, memberIds);

	const signupsWithLocation = useMemo(
		() =>
			signups.filter(
				(signup) => signup.latitude !== null
			) as IEventSignupComplete[],
		[signups]
	);

	const path = useOptimalPath(signupsWithLocation, carpool.event);

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<h2>Route Optimization</h2>
			{path ? (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span>Best route: {path.distance.toFixed(1)} miles</span>
					<br />
					{(() => {
						const driver = path.path.from;
						const waypoints = path.path.waypoints;

						let previousLocation: Location = driver;

						return (
							<>
								<span>Driver: {driver.user.name}</span>
								{waypoints.map((waypoint, index) => {
									const distance = getDistance(previousLocation, waypoint);
									previousLocation = waypoint;
									return (
										<span key={waypoint.user.id}>
											Passenger #{index + 1}: {waypoint.user.name} (
											{distance.toFixed(1)} miles)
										</span>
									);
								})}
								<span>
									Destination: {carpool.event.name} (
									{getDistance(carpool.event, previousLocation).toFixed(1)}{' '}
									miles)
								</span>
							</>
						);
					})()}
				</div>
			) : (
				'No valid paths are available.'
			)}
		</div>
	);
}
