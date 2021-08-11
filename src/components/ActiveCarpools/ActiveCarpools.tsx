import { useEffect, useState } from 'react';
import { getActiveCarpools } from '../api';
import { ICarpool } from '../types';
import UILink from '../UI/UILink';
import UISecondaryBox from '../UI/UISecondaryBox';

function ActiveCarpoolListItem({ carpool }: { carpool: ICarpool }) {
	return (
		<div>
			<h2>{carpool.name}</h2>
			<UILink href={`/carpools/${carpool.id}`}>View carpool</UILink>
		</div>
	);
}

export default function ActiveCarpools() {
	const [activeCarpools, setActiveCarpools] = useState<ICarpool[]>([]);

	useEffect(() => {
		getActiveCarpools().then(setActiveCarpools);
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<h1 style={{ textAlign: 'center' }}>Carpools</h1>
			<UISecondaryBox style={{ width: '100%', boxSizing: 'border-box' }}>
				{activeCarpools.map((carpool) => (
					<ActiveCarpoolListItem carpool={carpool} key={carpool.id} />
				))}
			</UISecondaryBox>
		</div>
	);
}
