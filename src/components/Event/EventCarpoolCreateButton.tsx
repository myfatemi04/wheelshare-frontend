import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { lightgrey } from '../../lib/colors';
import { createCarpool } from '../api';
import { useMe } from '../hooks';
import UIButton from '../UI/UIButton';
import UILink from '../UI/UILink';
import EventContext from './EventContext';

type CreationStatus = null | 'pending' | 'completed' | 'errored';

export default function EventCarpoolCreateButton() {
	const { event, setHasCarpool, tentativeInvites, signups } =
		useContext(EventContext);

	const [creationStatus, setCreationStatus] = useState<CreationStatus>(null);
	const [createdCarpoolId, setCreatedCarpoolId] = useState<null | number>(null);

	const me = useMe()!;
	const myCarpool = useMemo(
		() =>
			event.carpools.find((carpool) =>
				carpool.members.some((member) => member.id === me.id)
			),
		[event.carpools, me.id]
	);
	const alreadyInCarpool =
		myCarpool !== undefined || creationStatus === 'completed';

	useEffect(() => {
		setHasCarpool(alreadyInCarpool);
	}, [alreadyInCarpool, setHasCarpool]);

	const createCarpoolCallback = useCallback(() => {
		setCreationStatus('pending');

		createCarpool({
			name: me.name + "'s Carpool",
			eventId: event.id,
			invitedUserIds: Object.keys(tentativeInvites).map(Number),
		})
			.then(({ id }) => {
				setCreatedCarpoolId(id);
				event.carpools.push({
					id,
					name: me.name + "'s Carpool",
					members: [{ id: me.id, name: me.name }],
				});
				setCreationStatus('completed');
			})
			.catch(() => {
				setCreationStatus('errored');
			});
	}, [event.carpools, event.id, me.id, me.name, tentativeInvites]);

	const tentativeInviteNames = useMemo(() => {
		if (!signups) return [];
		const names = Object.keys(tentativeInvites).map((id) => {
			const signup = signups[id];
			return signup?.user.name;
		});
		return names.filter((n) => n != null);
	}, [tentativeInvites, signups]);

	let createCarpoolSection;

	if (tentativeInviteNames.length > 0) {
		const inviteeCount = tentativeInviteNames.length;
		const peoplePlural = inviteeCount > 1 ? 'People' : 'Person';
		createCarpoolSection = (
			<>
				<br />
				<b>List:</b>
				<br />
				{tentativeInviteNames.join(',')}
				<UIButton
					onClick={createCarpoolCallback}
					style={{ backgroundColor: lightgrey }}
				>
					{creationStatus === null
						? `Create Carpool With ${inviteeCount} ${peoplePlural}`
						: creationStatus === 'pending'
						? 'Creating...'
						: 'Errored'}
				</UIButton>
			</>
		);
	} else
		createCarpoolSection = (
			<>
				<span>Available to drive?</span>
				<UIButton
					onClick={createCarpoolCallback}
					style={{ backgroundColor: lightgrey }}
				>
					{creationStatus === null
						? 'Create Empty Carpool'
						: creationStatus === 'pending'
						? 'Creating...'
						: 'Errored'}
				</UIButton>
			</>
		);

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
				createCarpoolSection
			)}
		</div>
	);
}
