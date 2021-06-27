import { useMemo } from 'react';

function throttle<F extends (...args: any) => any, T>(
	this: T,
	callback: F,
	limit: number,
	thisArg?: T
): F {
	let waiting = false;
	let pendingArgs: null | any[] = null;
	const scope = thisArg ?? this;
	// @ts-ignore
	const fn = function (this: T, ...args: any[]) {
		if (!waiting) {
			callback.apply(this, args);
			waiting = true;
			setTimeout(() => {
				if (pendingArgs !== null) {
					callback.apply(this, pendingArgs);
					pendingArgs = null;
				}
				waiting = false;
			}, limit);
		} else {
			pendingArgs = args;
		}
	};
	fn.bind(scope);
	// @ts-ignore
	return fn;
}

export default function useThrottle<F extends (...args: any) => any>(
	fn: F,
	limit: number
) {
	return useMemo(() => throttle(fn, limit), [fn, limit]);
}
