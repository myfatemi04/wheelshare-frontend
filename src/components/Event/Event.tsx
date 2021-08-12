import { useCallback, useEffect, useState } from 'react';
import { getEvent } from '../api';
import { IEvent } from '../types';
import UILink from '../UI/UILink';
import UISecondaryBox from '../UI/UISecondaryBox';
import UISecondaryHeader from '../UI/UISecondaryHeader';
import useImmutable from '../useImmutable';
import EventContext from './EventContext';
import EventDetails from './EventDetails';
import EventInterestForm from './EventInterestForm';
import EventPlaceholder from './EventPlaceholder';

function GroupName({ group }: { group: IEvent['group'] }) {
	return <UILink href={`/groups/${group.id}`}>{group.name}</UILink>;
}

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
			.finally(() => setLoading(false));
	}, [id, setEvent]);

	useEffect(refresh, [refresh]);

	if (loading) {
		return <EventPlaceholder />;
	}

	if (!event) {
		return <h1>Event Not Found</h1>;
	}

	const { name, group } = event;

	return (
		<EventContext.Provider
			value={{
				event,
				refresh,
				default: false,
				tentativeInvites,
			}}
		>
			<UISecondaryBox style={{ width: '35rem', maxWidth: '100vw' }}>
				<div style={{ textAlign: 'center' }}>
					<UISecondaryHeader>{name}</UISecondaryHeader>
					{group && <GroupName group={group} />}
				</div>
				<EventDetails />
				<EventInterestForm />
			</UISecondaryBox>
		</EventContext.Provider>
	);
}
