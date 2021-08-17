import { useCallback, useEffect, useState } from 'react';
import { getEvent } from '../api';
import { IEvent } from '../types';
import useImmutable from '../useImmutable';
import EventContent from './EventContent';
import EventContext from './EventContext';
import EventPlaceholder from './EventPlaceholder';

export default function Event({
	id,
	initial,
}: {
	id: number;
	initial?: IEvent;
}) {
	const [event, setEvent] = useImmutable<IEvent | null>(initial ?? null);
	const [loading, setLoading] = useState(true);
	const [tentativeInvites] = useImmutable<Record<number, boolean>>({});

	const refresh = useCallback(() => {
		setLoading(true);
		getEvent(id)
			.then((e) => e && setEvent(e))
			.catch(console.error) // TODO error handling
			.finally(() => setLoading(false));
	}, [id, setEvent]);

	useEffect(refresh, [refresh]);

	if (loading) {
		return <EventPlaceholder />;
	}

	if (!event) {
		return <h1>Event Not Found</h1>;
	}

	return (
		<EventContext.Provider
			value={{
				event,
				refresh,
				default: false,
				tentativeInvites,
			}}
		>
			<EventContent />
		</EventContext.Provider>
	);
}
