import { Location } from './estimateoptimalpath';
import latlongdist, { R_miles } from './latlongdist';

export default function getDistance(...locations: Location[]): number {
	let distance = 0;
	for (let i = 0; i < locations.length - 1; i++) {
		const from = locations[i];
		const to = locations[i + 1];
		distance += latlongdist(from, to, R_miles);
	}
	return distance;
}
