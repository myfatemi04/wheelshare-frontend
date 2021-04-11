import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeAPIGetCall } from '../api/utils';

const maybePluralize = (count: number, noun: string, suffix = 's') =>
	`${count} ${noun}${count !== 1 ? suffix : ''}`;

const SAMPLE_POOLS: Carpool.Pool[] = [
	{
		id: '1234',
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
	const [group, setGroup] = useState<Carpool.Group>();
	const [pools, setPools] = useState<Carpool.Pool[]>(SAMPLE_POOLS);

	useEffect(() => {
		makeAPIGetCall('/group', { id }).then((res) => setGroup(res.data.data));
	}, [id]);

	return (
		<div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
			<Typography variant="h1">Group</Typography>
			<h1
				className="d-flex justify-content-center p-4"
				style={{ backgroundColor: '#F1EAE8', fontFamily: 'Impact' }}
			>
				Pools
			</h1>
			<a
				className="btn btn-large btn-success"
				href="/create_pool"
				style={{ fontFamily: 'Courier New' }}
			>
				Create Pool
			</a>
			<div className="container" style={{ fontFamily: 'Courier New' }}>
				<br></br>
				{pools.map((pool, index) => {
					let background;
					if (index % 2 === 0) {
						background = '#F1EAE8';
					} else {
						background = '#FFFFFF';
					}
					return (
						<div
							className="card card-body text-left"
							style={{ backgroundColor: background }}
						>
							<a href={'/Pool/' + pool.id} className="card-title">
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
						</div>
					);
				})}
			</div>
		</div>
	);
}
