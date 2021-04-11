import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeAPIGetCall } from '../api/utils';
import Pool from './Pool';

export default function PoolPage() {
	const id = useParams<{ id: string }>().id;
	const [pool, setPool] = useState<Carpool.Pool>();

	const fetchData = useCallback(() => {
		makeAPIGetCall(`/pools/${id}`).then((response) => {
			if (response.data.data) {
				setPool(response.data.data);
			}
		});
	}, [id]);

	useEffect(() => fetchData(), [fetchData]);

	if (pool != null) {
		return <Pool pool={pool} triggerUpdate={fetchData} />;
	} else {
		return null;
	}
}
