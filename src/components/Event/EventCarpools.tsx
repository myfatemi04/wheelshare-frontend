// import CallMergeIcon from '@material-ui/icons/CallMerge';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { useCallback, useState } from 'react';
import { createCarpool } from '../api';
import { lightgrey } from '../colors';
import { useMe } from '../hooks';
import { ICarpool, IEvent } from '../types';
import UIButton from '../UI/UIButton';

function CarpoolRow({ carpool }: { carpool: ICarpool }) {
	const PADDING = '1rem';
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				position: 'relative',
				justifyContent: 'space-between',
				padding: PADDING,
				borderRadius: '0.5rem',
				border: '1px solid #e0e0e0',
				marginTop: '0.5rem',
				marginBottom: '0.5rem',
			}}
		>
			{/* <div> */}
			<span
				style={{ fontWeight: 600, cursor: 'pointer' }}
				onClick={() => {
					window.location.href = '/carpools/' + carpool.id;
				}}
			>
				{carpool.name}
			</span>
			<br />
			<br />
			{/* <div style={{ display: 'flex', alignItems: 'center' }}>
					<CallMergeIcon style={{ marginRight: '1rem' }} />{' '}
					<b>{carpool.extraDistance} miles</b>
				</div> */}
			{/* </div> */}
			<EmojiPeopleIcon style={{ fontSize: '2em' }} />
		</div>
	);
}

const dummyCarpoolData: ICarpool[] = [
	{
		id: 0,
		name: 'carpoollo2398',
		eventId: 0,
		event: {
			id: 0,
			name: 'test event',
			latitude: 0,
			longitude: 0,
			formattedAddress: 'your house',
			placeId: 'secret',
		},
		members: [],
		invitations: [],
	},
];

export default function Carpools({ event }: { event: IEvent }) {
	// eslint-disable-next-line
	const [carpools, _setCarpools] = useState(dummyCarpoolData);
	const [creationStatus, setCreationStatus] =
		useState<null | 'pending' | 'completed' | 'errored'>(null);
	const me = useMe()!;

	const createEmptyCarpool = useCallback(() => {
		setCreationStatus('pending');

		createCarpool({ name: me.name + "'s Carpool", eventId: event.id })
			.then(() => {
				setCreationStatus('completed');
			})
			.catch(() => {
				setCreationStatus('errored');
			});

		setTimeout(() => setCreationStatus('completed'), 1000);
	}, [event.id, me.name]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h3 style={{ marginBlockEnd: '0' }}>Carpools</h3>
			<br />
			<>Available to drive?</>
			<UIButton
				onClick={createEmptyCarpool}
				style={{ backgroundColor: lightgrey }}
			>
				{creationStatus === null
					? 'Create Empty Carpool'
					: creationStatus === 'pending'
					? 'Creating...'
					: creationStatus === 'completed'
					? 'Created!'
					: 'Errored'}
			</UIButton>
			{carpools.map((carpool) => (
				<CarpoolRow carpool={carpool} key={carpool.id} />
			))}
		</div>
	);
}
