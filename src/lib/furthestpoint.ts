import { Location } from './estimateoptimalpath';
import getDistance from './getdistance';

export default function furthestPoint<M extends Location>(
	locations: M[],
	destination: Location
) {
	let maxDistance = 0;
	let maxLocation: M | null = null;
	for (let i = 0; i < locations.length; i++) {
		let distance = getDistance(locations[i], destination);

		if (distance > maxDistance) {
			maxDistance = distance;
			maxLocation = locations[i];
		}
	}

	return { maxDistance, maxLocation };
}
