import { useState, useEffect } from 'react';
import { getEventSignupsBulk } from '../api';
import { IEventSignup } from '../types';

// Fetchs bulk signups from the API for the given event and user ids
// and returns a memoized result.
export default function useSignups(eventId: number, userIds: number[]) {
	const [signups, setSignups] = useState<IEventSignup[]>([]);

	useEffect(() => {
		getEventSignupsBulk(eventId, userIds).then((signups) => {
			setSignups(signups);
		});
	}, [eventId, userIds]);

	return signups;
}
