import { useDebugValue, useMemo } from 'react';
import estimateOptimalPath, {
	Location,
	Path,
} from '../lib/estimateoptimalpath';

export default function useOptimalPath<M extends Location, D extends Location>(
	members: M[],
	destination: D
) {
	const path = useMemo(() => {
		if (members.length === 0) {
			return null;
		}

		// O(n^2)
		const path = members.reduce((prev, driver) => {
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

			if (prev == null) {
				return path;
			}

			if (prev.distance > path.distance) {
				return path;
			}

			return prev;
		}, null! as { path: Path<M, D>; distance: number });

		return path;
	}, [destination, members]);

	useDebugValue(path);

	return path;
}
