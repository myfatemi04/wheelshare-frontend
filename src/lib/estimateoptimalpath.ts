import { ICarpool, IEventSignupComplete } from '../components/types';
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

export default function estimateOptimalPath(
	path: Path<IEventSignupComplete, ICarpool['event']>
): {
	path: Path<IEventSignupComplete, ICarpool['event']>;
	distance: number;
} {
	const { from, to, waypoints } = path;
	let sequence = [from, to];

	// Calculates all possible paths from the start to the end of the given path
	// and returns the one with the minimum distance
	for (let waypoint of waypoints) {
		// Iterate over all possible insertion points for the waypoint
		let minDistance = Infinity;
		let insertionPoint = 0;
		for (let i = 0; i < sequence.length - 1; i++) {
			const [start, end] = sequence.slice(i, i + 2);

			const distance = getDistance(start, waypoint, end);
			if (distance < minDistance) {
				minDistance = distance;
				insertionPoint = i;
			}
		}

		sequence = sequence
			.slice(0, insertionPoint + 1)
			.concat([waypoint])
			.concat(sequence.slice(insertionPoint + 1));
	}

	const newWaypoints = sequence.slice(1, sequence.length - 1);

	return {
		path: {
			from,
			to,
			waypoints: newWaypoints as IEventSignupComplete[],
		},
		distance: getDistance(from, ...sequence, to),
	};
}
