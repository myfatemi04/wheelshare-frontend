import getDistance from '../lib/getdistance';

export type Location = {
	latitude: number;
	longitude: number;
};

export type Path<M extends Location, D extends Location> = {
	from: M;
	waypoints: M[];
	to: D;
};

export function addWaypointOptimally<M extends Location, D extends Location>(
	path: Path<M, D>,
	waypoint: M
): {
	path: Path<M, D>;
	distance: number;
} {
	const { from, to, waypoints } = path;
	let sequence = [from, ...waypoints, to];

	// Iterate over all possible insertion points for the waypoint
	let minDistance = Infinity;
	let minI = 0;
	for (let i = 0; i < sequence.length - 1; i++) {
		const temporarySequence = [
			...sequence.slice(0, i + 1),
			waypoint,
			...sequence.slice(i + 1),
		];
		const distance = getDistance(...temporarySequence);
		if (distance < minDistance) {
			minDistance = distance;
			minI = i;
		}
	}

	sequence = [
		...sequence.slice(0, minI + 1),
		waypoint,
		...sequence.slice(minI + 1),
	];

	const newWaypoints = sequence.slice(1, sequence.length - 1);

	return {
		path: {
			from,
			to,
			waypoints: newWaypoints as M[],
		},
		distance: getDistance(from, ...sequence, to),
	};
}

export function estimateOptimalWaypointOrder<
	M extends Location,
	D extends Location
>(path: Path<M, D>) {
	let newPath: Path<M, D> = {
		from: path.from,
		to: path.to,
		waypoints: [],
	};
	let distance = getDistance(path.from, path.to);

	for (let waypoint of path.waypoints) {
		const result = addWaypointOptimally(newPath, waypoint);
		newPath = result.path;
		distance = result.distance;
	}

	return { path: newPath, distance };
}

export function distanceAddedByWaypoint<M extends Location, D extends Location>(
	path: Path<M, D>,
	waypoint: M
): number {
	const originalDistance = getDistance(path.from, ...path.waypoints, path.to);
	const { distance: newDistance } = addWaypointOptimally(path, waypoint);

	return newDistance - originalDistance;
}
