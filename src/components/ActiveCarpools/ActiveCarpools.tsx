import { useEffect } from 'react';
import { useState } from 'react';
import { getActiveCarpools } from '../api';
import { ICarpool } from '../types';
import UISecondaryBox from '../UI/UISecondaryBox';
import UISecondaryHeader from '../UI/UISecondaryHeader';

function ActiveCarpoolListItem({ carpool }: { carpool: ICarpool }) {
	return (
		<UISecondaryBox>
			<UISecondaryHeader>
				<a href={'/carpools/' + carpool.id}>{carpool.name}</a>
			</UISecondaryHeader>
		</UISecondaryBox>
	);
}

export default function ActiveCarpools() {
	const [activeCarpools, setActiveCarpools] = useState<ICarpool[]>([]);

	useEffect(() => {
		getActiveCarpools().then(setActiveCarpools);
	}, []);

	return (
		<>
			<h1>Carpools</h1>
			<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				{activeCarpools.map((carpool) => (
					<ActiveCarpoolListItem carpool={carpool} key={carpool.id} />
				))}
			</div>
		</>
	);
}
