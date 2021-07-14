import { useMemo } from 'react';
import estimateOptimalPath, { Location } from '../lib/estimateoptimalpath';
import furthestPoint from '../lib/furthestpoint';

export default function useOptimalPath(
	memberLocations: Location[],
	destination: Location
) {
	return useMemo(() => {
		if (memberLocations.length === 0) {
			return null;
		}

		// O(n)
		const { maxLocation: driverLocation } = furthestPoint(
			memberLocations,
			destination
		);

		// O(n)
		const passengerLocations = memberLocations.filter(
			(location) => location !== driverLocation
		);

		// O(n)
		return estimateOptimalPath({
			from: driverLocation!,
			waypoints: passengerLocations,
			to: destination,
		});
	}, [destination, memberLocations]);
}
