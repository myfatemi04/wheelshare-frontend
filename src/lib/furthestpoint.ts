import { Location } from './estimateoptimalpath';
import getDistance from './getdistance';

export default function furthestPoint(
	locations: Location[],
	destination: Location
) {
	let maxDistance = 0;
	let maxLocation = { latitude: 0, longitude: 0 };
	for (let i = 0; i < locations.length; i++) {
		let distance = getDistance(locations[i], destination);

		if (distance > maxDistance) {
			maxDistance = distance;
			maxLocation = locations[i];
		}
	}

	return { maxDistance, maxLocation };
}
