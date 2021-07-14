import latlongdist from './latlongdist';

export type Location = {
	latitude: number;
	longitude: number;
};

export type Path = {
	from: Location;
	to: Location;
	waypoints: Location[];
};

function getDistance(...locations: Location[]): number {
	let distance = 0;
	for (let i = 0; i < locations.length - 1; i++) {
		const from = locations[i];
		const to = locations[i + 1];
		distance += latlongdist(
			from.latitude,
			from.longitude,
			to.latitude,
			to.longitude
		);
	}
	return distance;
}

export default function estimateOptimalPath(path: Path): {
	path: Path;
	distance: number;
} {
	const { from, to, waypoints } = path;
	let sequence = [from, to];

	// Calculates all possible paths from the start to the end of the given path
	// and returns the one with the minimum distance
	for (let waypoint of waypoints) {
		// Iterate over all possible insertion points for the waypoint
		let minDistance = Infinity;
		let insertionPoint = 1;
		for (let i = 0; i < sequence.length - 1; i++) {
			const [start, end] = sequence.slice(i, i + 2);

			const distance = getDistance(start, waypoint, end);
			if (distance < minDistance) {
				minDistance = distance;
				insertionPoint = i;
			}
		}

		sequence = sequence
			.slice(0, insertionPoint)
			.concat([waypoint])
			.concat(sequence.slice(insertionPoint));
	}

	const newWaypoints = sequence.slice(1, sequence.length - 1);
	return {
		path: {
			from,
			to,
			waypoints: newWaypoints,
		},
		distance: getDistance(from, ...sequence, to),
	};
}
