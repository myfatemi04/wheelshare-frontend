import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeAPIGetCall } from '../api/utils';
import CreatePool from './CreatePool';
import Pool from './Pool';

const SAMPLE_POOLS: Carpool.Pool[] = [
	{
		_id: '1234',
		title: 'TJ Carpool',
		description: 'Carpool from TJ track to homes',
		start_time: '4/10/2021 3:00 PM',
		end_time: '4/10/2021 4:00 PM',
		capacity: 2,
		participant_ids: [],
		comments: [
			{
				author_id: 'joshua_hsueh',
				body: 'What is the covid vaccination status of all the participants?',
				id: 'comment_0',
			},
		],
		driver_id: 'michael',
		create_time: '0',
		update_time: '0',
		group_id: 'test_group',
		status: 'pending',
		direction: 'dropoff',
		author_id: 'michael',
		type: 'offer',
	},
];

export default function Group() {
	// eslint-disable-next-line
	const { id } = useParams<{ id: string }>();
	const [error, setError] = useState(false);
	const [group, setGroup] = useState<Carpool.Group>();
	const [pools, setPools] = useState<Carpool.Pool[]>([]);
	const [createPoolVisible, setCreatePoolVisible] = useState(false);

	const fetchPools = useCallback(() => {
		makeAPIGetCall(`/groups/${id}/pools`).then((res) => {
			setPools(res.data.data);
		});
	}, [id]);

	useEffect(() => fetchPools(), [fetchPools]);

	useEffect(() => {
		makeAPIGetCall(`/groups/${id}`).then((res) => {
			if ('error' in res.data) {
				setError(true);
			} else {
				setGroup(res.data.data);
			}
		});
	}, [id]);

	if (error) {
		return <h1 style={{ textAlign: 'center' }}>Group Not Found</h1>;
	}

	if (!group) {
		return <h1 style={{ textAlign: 'center' }}>Loading</h1>;
	}

	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				padding: '1rem',
			}}
		>
			<Typography variant="h1" align="center">
				{group.name}
			</Typography>

			<Typography variant="h3" align="center">
				Pools
			</Typography>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div>
					<Button
						onClick={() => setCreatePoolVisible((v) => !v)}
						variant="contained"
					>
						{createPoolVisible ? 'Cancel' : 'Create Pool'}
					</Button>
					{createPoolVisible && <CreatePool groupID={group._id} />}
				</div>
				{pools.map((pool, index) => (
					<Pool pool={pool} triggerUpdate={fetchPools} key={index} />
				))}
			</div>
		</div>
	);
}
