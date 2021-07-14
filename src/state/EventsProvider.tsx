import { createContext, ReactNode, useCallback, useState } from 'react';
import * as immutable from 'immutable';
import { useMemo } from 'react';

export class EventSignup extends immutable.Record({
	userId: 0,
	placeId: '',
	formattedAddress: '',
	latitute: 0,
	longitude: 0,
}) {}

export class EventState extends immutable.Record({
	id: 0,
	name: '',
	signups: immutable.Map<string, EventSignup>(),
}) {
	addSignup(
		userId: number,
		placeId: string,
		formattedAddress: string,
		latitute: number,
		longitude: number
	) {
		return this.set(
			'signups',
			this.signups.set(
				userId.toString(),
				new EventSignup({
					userId,
					placeId,
					formattedAddress,
					latitute,
					longitude,
				})
			)
		);
	}
	setName(name: string) {
		return this.set('name', name);
	}
}

type EventsProps = {
	events: immutable.Map<number, EventState>;
	upsertEvent: (event: EventState) => void;
};

export const EventsContext = createContext<EventsProps>({
	events: immutable.Map<number, EventState>(),
	upsertEvent: () => {},
});

export default function EventsProvider({ children }: { children: ReactNode }) {
	const [events, setEvents] = useState(immutable.Map<number, EventState>());

	const upsertEvent = useCallback(
		(event: EventState) => {
			setEvents(events.set(event.id, event));
		},
		[events]
	);

	const value: EventsProps = useMemo(() => {
		return {
			events,
			upsertEvent,
		};
	}, [events, upsertEvent]);

	return (
		<EventsContext.Provider value={value}>{children}</EventsContext.Provider>
	);
}
