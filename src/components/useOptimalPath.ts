import { useDebugValue, useMemo } from 'react';
import estimateOptimalPath, { Path } from '../lib/estimateoptimalpath';
import { ICarpool, IEventSignupWithLocation } from './types';

export default function useOptimalPath(
	members: IEventSignupWithLocation[],
	destination: ICarpool['event']
) {
	const path = useMemo(() => {
		if (members.length === 0) {
			return null;
		}

		// O(n^2)
		const path = members.reduce((prev, driver) => {
			if (!driver.canDrive) {
				return prev;
			}

			// O(n)
			const passengerLocations = members.filter(
				(location) => location !== driver
			);

			// O(n)
			const path = estimateOptimalPath({
				from: driver,
				waypoints: passengerLocations,
				to: destination,
			});

			if (prev == null) {
				return path;
			}

			if (prev.distance > path.distance) {
				return path;
			}

			return prev;
		}, null! as { path: Path<IEventSignupWithLocation, ICarpool['event']>; distance: number });

		return path;
	}, [destination, members]);

	useDebugValue(path);

	return path;
}
