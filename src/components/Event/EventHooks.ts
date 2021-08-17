import { useContext, useDebugValue, useMemo } from 'react';
import { useMe } from '../hooks';
import EventContext from './EventContext';

export function useCurrentEventId() {
	const { event } = useContext(EventContext);
	return useMemo(() => event.id, [event.id]);
}

export function useCurrentEventName() {
	const { event } = useContext(EventContext);
	return useMemo(() => event.name, [event.name]);
}

export function useCurrentEventDescription() {
	const { event } = useContext(EventContext);
	return useMemo(() => event.description, [event.description]);
}

export function useCurrentEventCreator() {
	const { event } = useContext(EventContext);
	return useMemo(() => event.creator, [event.creator]);
}

export function useCurrentEventGroup() {
	const { event } = useContext(EventContext);
	return useMemo(() => event.group, [event.group]);
}

export function useIsCurrentEventCreator() {
	const creator = useCurrentEventCreator();
	const me = useMe();
	if (!me) {
		return false;
	}
	return me.id === creator.id;
}

export function useCurrentEventSignups() {
	const signups = useContext(EventContext).event.signups;

	useDebugValue(signups);

	return signups;
}

export function useCurrentEventSignup() {
	const signups = useCurrentEventSignups();
	const me = useMe() || { id: 0, name: '' };

	const signup = useMemo(() => signups[me.id] ?? null, [signups, me.id]);

	useDebugValue(signup);

	return signup;
}

export function useCurrentEventCarpool() {
	const me = useMe() || { id: 0, name: '' };
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

export function useMutableEvent() {
	return useContext(EventContext).event;
}
