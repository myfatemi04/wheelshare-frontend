import { useDebugValue, useMemo } from 'react';
import estimateOptimalPath, { Location } from '../lib/estimateoptimalpath';

export default function useOptimalPathWithDriver<
	M extends Location,
	D extends Location
>(driver: M, members: M[], destination: D) {
	const path = useMemo(() => {
		if (members.length === 0) {
			return null;
		}

		// O(n)
		const passengerLocations = members.filter(
			(location) => location !== driver
		);

		// O(n)
		const path = estimateOptimalPath<M, D>({
			from: driver,
			waypoints: passengerLocations,
			to: destination,
		});

		return path;
	}, [destination, driver, members]);

	useDebugValue(path);

	return path;
}
