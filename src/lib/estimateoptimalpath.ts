import getDistance from './getdistance';

export type Location = {
	latitude: number;
	longitude: number;
};

export type Path<M extends Location, D extends Location> = {
	from: M;
	waypoints: M[];
	to: D;
};

export default function estimateOptimalPath<
	M extends Location,
	D extends Location
>(
	path: Path<M, D>
): {
	path: Path<M, D>;
	distance: number;
} {
	const { from, to, waypoints } = path;
	let sequence = [from, to];

	console.log('Sequence:', sequence, '; distance:', getDistance(...sequence));

	// Calculates all possible paths from the start to the end of the given path
	// and returns the one with the minimum distance
	for (let waypoint of waypoints) {
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

		console.log('Sequence:', sequence, '; distance:', getDistance(...sequence));
	}

	const newWaypoints = sequence.slice(1, sequence.length - 1);

	console.log({ sequence, path });

	return {
		path: {
			from,
			to,
			waypoints: newWaypoints as M[],
		},
		distance: getDistance(from, ...sequence, to),
	};
}
