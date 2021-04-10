import React, { useState, useEffect } from 'react';

const Pools = (props) => {
	const [state, setState] = useState({
		Pools: [
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
		],
	});

	const callAPI = () => {
		fetch(`${process.env.REACT_APP_API_ENDPOINT}/pools/`)
			.then((response) => response.json())
			.then((data) => {
				if (data !== undefined) {
					setState(data);
				}
			});
	};

	useEffect(() => {
		callAPI();
	}, []);
	const maybePluralize = (count, noun, suffix = 's') =>
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
				{state.Pools.map((Pool, el) => {
					let background;
					if (el % 2 == 0) {
						background = '#F1EAE8';
					} else {
						background = '#FFFFFF';
					}
					return (
						<div
							className="card card-body text-left"
							style={{ backgroundColor: background }}
						>
							<a href={'/Pool/' + Pool.id} className="card-title">
								{Pool.pool_title}
							</a>
							<p className="text-left">
								Capacity: {Pool.participants.length} / {Pool.capacity}
							</p>
							<p className="text-left">Start Time: {Pool.start_time}</p>
							<p className="text-left">End Time: {Pool.end_time}</p>
							<p className="text-warning">
								{maybePluralize(Pool.comments.length, 'comment')}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Pools;
