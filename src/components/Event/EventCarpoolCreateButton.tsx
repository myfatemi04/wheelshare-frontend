import { useCallback, useContext, useState } from 'react';
import { lightgrey } from '../../lib/colors';
import { createCarpool } from '../api';
import { useMe } from '../hooks';
import UIButton from '../UI/UIButton';
import UILink from '../UI/UILink';
import EventContext from './EventContext';
import { useCurrentEventCarpool } from './EventHooks';

type CreationStatus = null | 'pending' | 'completed' | 'errored';

export default function EventCarpoolCreateButton() {
	const { event, tentativeInvites } = useContext(EventContext);

	const [creationStatus, setCreationStatus] = useState<CreationStatus>(null);
	const [createdCarpoolId, setCreatedCarpoolId] = useState<null | number>(null);

	const me = useMe() || { id: 0, name: '' };
	const myCarpool = useCurrentEventCarpool();

	const createCarpoolCallback = useCallback(async () => {
		setCreationStatus('pending');

		const { id } = await createCarpool({
			name: me.name + "'s Carpool",
			eventId: event.id,
			invitedUserIds: Object.keys(tentativeInvites).map(Number),
		});
		try {
			event.carpools.push({
				id,
				note: '',
				name: me.name + "'s Carpool",
				members: [{ id: me.id, name: me.name }],
			});
			setCreatedCarpoolId(id);
			setCreationStatus('completed');
		} catch (e) {
			setCreationStatus('errored');
		}
	}, [event.carpools, event.id, me.id, me.name, tentativeInvites]);

	const inviteCount = Object.keys(tentativeInvites).length;

	return (
		<div>
			{creationStatus === 'completed' ? (
				<span>
					Created{' '}
					<UILink href={`/carpools/${createdCarpoolId}`}>your carpool</UILink>!
				</span>
			) : myCarpool ? (
				<span>
					You are already in a carpool for this event:{' '}
					<UILink href={`/carpools/${myCarpool.id}`}>{myCarpool.name}</UILink>
				</span>
			) : (
				<>
					<span style={{ fontSize: '0.875em' }}>Available to drive?</span>
					<UIButton
						onClick={createCarpoolCallback}
						style={{ backgroundColor: lightgrey }}
					>
						{creationStatus === null
							? inviteCount === 0
								? 'Create Empty Carpool'
								: 'Create With ' + inviteCount
							: creationStatus === 'pending'
							? 'Creating...'
							: 'Errored'}
					</UIButton>
				</>
			)}
		</div>
	);
}
