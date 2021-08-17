import { useContext, useMemo } from 'react';
import { Location } from '../../lib/estimateoptimalpath';
import getDistance from '../../lib/getdistance';
import { IEventSignupWithLocation } from '../types';
import useOptimalPath from '../useOptimalPath';
import { CarpoolContext } from './Carpool';
import useSignups from './useSignups';

export default function CarpoolRouteEstimator() {
	const { carpool } = useContext(CarpoolContext);
	const { members } = carpool;

	const memberIds = useMemo(
		() => members.map((member) => member.id),
		[members]
	);

	const signups = useSignups(carpool.event.id, memberIds);

	const completedSignups = useMemo(
		() =>
			signups.filter(
				(signup) => signup.latitude !== null
			) as IEventSignupWithLocation[],
		[signups]
	);

	const path = useOptimalPath(completedSignups, carpool.event);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
				boxSizing: 'border-box',
				padding: '0rem 2rem',
			}}
		>
			<h2>Route Optimization</h2>
			{path ? (
				<div
					style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
				>
					<span>Best route (estimate): {path.distance.toFixed(1)} miles</span>
					<br />
					<em>
						This number is lower than the distance of the actual route, and
						should only be used to get a rough idea of the distance.
					</em>
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
