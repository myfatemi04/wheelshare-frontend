import CallMergeIcon from '@material-ui/icons/CallMerge';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { useState } from 'react';
import { lightgrey } from '../colors';
import UIButton from '../UI/UIButton';
import { IEvent } from './Event';

export type ICarpool = {
	driver: {
		id: number;
		name: string;
	};
	startTime: string;
	endTime: string;
	extraDistance: number;
};

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
			<div>
				<span style={{ fontWeight: 600 }}>{carpool.driver.name}</span>
				<br />
				<br />
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<ScheduleIcon style={{ marginRight: '1rem' }} />
					{carpool.startTime} - {carpool.endTime}
				</div>
				<br />
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<CallMergeIcon style={{ marginRight: '1rem' }} />{' '}
					<b>{carpool.extraDistance} miles</b>
				</div>
			</div>
			<EmojiPeopleIcon style={{ fontSize: '2em' }} />
		</div>
	);
}

const dummyCarpoolData: ICarpool[] = [
	{
		driver: {
			id: 0,
			name: 'Michael Fatemi',
		},
		startTime: '10:00',
		endTime: '10:10',
		extraDistance: 6.9,
	},
	{
		driver: {
			id: 1,
			name: 'Joshua Hsueh',
		},
		startTime: '10:05',
		endTime: '10:10',
		extraDistance: 420,
	},
];

export default function Carpools({ event }: { event: IEvent }) {
	// eslint-disable-next-line
	const [carpools, _setCarpools] = useState(dummyCarpoolData);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h3 style={{ marginBlockEnd: '0' }}>Carpools</h3>
			<br />
			<>Available to drive?</>
			<UIButton onClick={() => {}} style={{ backgroundColor: lightgrey }}>
				I'm not available
			</UIButton>
			{carpools.map((carpool) => (
				<CarpoolRow carpool={carpool} key={carpool.driver.id} />
			))}
		</div>
	);
}
