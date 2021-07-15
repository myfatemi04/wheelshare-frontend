import { useContext, useDebugValue, useMemo } from 'react';
import { useMe } from '../hooks';
import EventContext from './EventContext';

export function useSignups() {
	const signups = useContext(EventContext).event.signups;

	useDebugValue(signups);

	return signups;
}

export function useMySignup() {
	const signups = useSignups();
	const me = useMe()!;

	const signup = useMemo(() => signups[me.id] ?? null, [signups, me.id]);

	useDebugValue(signup);

	return signup;
}

export function useMyCarpool() {
	const me = useMe()!;
	const { event } = useContext(EventContext);

	const carpool = useMemo(
		() =>
			event.carpools.find((carpool) =>
				carpool.members.some((member) => member.id === me.id)
			),
		[event.carpools, me.id]
	);

	useDebugValue(carpool);

	return carpool;
}
