import { useContext, useMemo } from 'react';
import { useMe } from '../hooks';
import EventContext from './EventContext';

export default function useMySignup() {
	const { signups } = useContext(EventContext);
	const me = useMe()!;

	return useMemo(() => signups[me.id] ?? null, [signups, me.id]);
}
