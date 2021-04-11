import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeAPIGetCall } from '../api/utils';

const maybePluralize = (count: number, noun: string, suffix = 's') =>
	`${count} ${noun}${count !== 1 ? suffix : ''}`;

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
	const [pools, setPools] = useState<Carpool.Pool[]>(SAMPLE_POOLS);

	useEffect(() => {
		makeAPIGetCall(`/groups/${id}`).then((res) => {
			if ('error' in res.data) {
				setError(true);
			} else {
				setGroup(res.data.data);
			}
		});

		makeAPIGetCall(`/groups/${id}/pools`).then((res) => {
			setPools(res.data.data);
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
			<Button
				onClick={() => (window.location.href = '/create_pool')}
				variant="contained"
			>
				Create Pool
			</Button>
			<div className="container">
				{pools.map((pool, index) => {
					return (
						<Card style={{ margin: '0.5em' }} key={index}>
							<a href={'/pools/' + pool._id} className="card-title">
								{pool.title}
							</a>
							<p className="text-left">
								Capacity: {pool.participant_ids.length} / {pool.capacity}
							</p>
							<p className="text-left">Start Time: {pool.start_time}</p>
							<p className="text-left">End Time: {pool.end_time}</p>
							<p className="text-warning">
								{maybePluralize(pool.comments.length, 'comment')}
							</p>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
