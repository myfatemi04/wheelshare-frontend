import { useState } from 'react';
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
				padding: PADDING,
				borderRadius: '0.5rem',
				border: '1px solid #e0e0e0',
				marginTop: '0.5rem',
				marginBottom: '0.5rem',
			}}
		>
			<div>
				<span style={{ fontWeight: 500 }}>{carpool.driver.name}</span>
				<br />
				Time:{' '}
				<b>
					{carpool.startTime} - {carpool.endTime}
				</b>
				<br />
				Offset from route: <b>{carpool.extraDistance} miles</b>
			</div>
			<div
				style={{
					borderRadius: '0.5em',
					cursor: 'pointer',
					padding: '0.5em',
					position: 'absolute',
					right: PADDING,
					userSelect: 'none',
					backgroundColor: '#e0e0e0',
				}}
			>
				Request to join
			</div>
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
			{carpools.map((carpool) => (
				<CarpoolRow carpool={carpool} key={carpool.driver.id} />
			))}
		</div>
	);
}
