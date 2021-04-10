import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../api';

const MyPools = () => {
	// const id = props.match.params.id;
	const [pools, setPools] = useState([
		{
			id: 1,
			pool_title: 'TJ Carpool',
			pool_text: 'Carpool from TJ track to homes',
			start_time: '4/10/2021 3:00 PM',
			end_time: '4/10/2021 4:00 PM',
			capacity: 2,
			participants: [],
			comments: [
				'What is the covid vaccination status of all the participants?',
			],
		},
		{
			id: 2,
			pool_title: 'TJ Carpool',
			pool_text: 'Carpool from TJ track to homes',
			start_time: '4/10/2021 3:00 PM',
			end_time: '4/10/2021 4:00 PM',
			capacity: 2,
			participants: [],
			comments: [
				'What is the covid vaccination status of all the participants?',
			],
		},
		{
			id: 3,
			pool_title: 'TJ Carpool',
			pool_text: 'Carpool from TJ track to homes',
			start_time: '4/10/2021 3:00 PM',
			end_time: '4/10/2021 4:00 PM',
			capacity: 2,
			participants: [],
			comments: [
				'What is the covid vaccination status of all the participants?',
			],
		},
		{
			id: 4,
			pool_title: 'TJ Carpool',
			pool_text: 'Carpool from TJ track to homes',
			start_time: '4/10/2021 3:00 PM',
			end_time: '4/10/2021 4:00 PM',
			capacity: 2,
			participants: [],
			comments: [
				'What is the covid vaccination status of all the participants?',
			],
		},
	]);

	useEffect(() => {
		console.log(process.env);
		fetch(`${API_ENDPOINT}/my_pools`)
			.then((response) => response.json())
			.then((json) => {
				if (json) {
					setPools(json.data);
				}
			});
	}, []);

	const maybePluralize = (count: number, noun: string, suffix = 's') =>
		`${count} ${noun}${count !== 1 ? suffix : ''}`;
	return (
		<div className="bg-dark" style={{ minHeight: '100vh' }}>
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
								{pool.pool_title}
							</a>
							<p className="text-left">
								Capacity: {pool.participants.length} / {pool.capacity}
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
};

export default MyPools;
