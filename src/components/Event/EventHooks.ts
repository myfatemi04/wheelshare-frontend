import { useContext, useMemo } from 'react';
import { useMe } from '../hooks';
import EventContext from './EventContext';

export function useSignups() {
	return useContext(EventContext).event.signups;
}

export function useMySignup() {
	const signups = useSignups();
	const me = useMe()!;

	return useMemo(() => signups[me.id] ?? null, [signups, me.id]);
}
