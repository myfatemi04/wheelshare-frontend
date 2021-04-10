import React, { useState, useEffect } from 'react';

const Profile = (props) => {
	const [state, setState] = useState({
		user: { username: 'HyperionLegion' },
		pools: [
			{
				pool_title: 'TJ Carpool',
				pool_text: 'Carpool from TJ track to homes',
				start_time: '4/10/2021 3:00 PM',
				id: 1,
				end_time: '4/10/2021 4:00 PM',
				capacity: 2,
				participants: [],
				comments: [
					'What is the covid vaccination status of all the participants?',
				],
			},
			{
				pool_title: 'TJ Carpool',
				pool_text: 'Carpool from TJ track to homes',
				start_time: '4/10/2021 3:00 PM',
				id: 2,
				end_time: '4/10/2021 4:00 PM',
				capacity: 2,
				participants: [],
				comments: [
					'What is the covid vaccination status of all the participants?',
				],
			},
			{
				pool_title: 'TJ Carpool',
				pool_text: 'Carpool from TJ track to homes',
				start_time: '4/10/2021 3:00 PM',
				id: 3,
				end_time: '4/10/2021 4:00 PM',
				capacity: 2,
				participants: [],
				comments: [
					'What is the covid vaccination status of all the participants?',
				],
			},
		],
		groups: [],
	});

	const callAPI = () => {
		fetch(`${process.env.REACT_APP_API_ENDPOINT}/profile/`)
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
	return (
		<div className="" style={{ minHeight: '100vh' }}>
			<h1
				className="d-flex justify-content-center p-4"
				style={{ backgroundColor: '#F1EAE8', fontFamily: 'Impact' }}
			>
				Profile
			</h1>
			<div className="container" style={{ fontFamily: 'Courier New' }}>
				<h1>Hello {state.user.username}!</h1>
				<h2>Your Pools:</h2>
				<div className="">
					{state.pools.map((pool) => {
						return (
							<div
								className="text-left m-2 p-1"
								style={{ backgroundColor: '#D6D1D0' }}
							>
								<a href={'pool/' + pool.id}>{pool.pool_title}</a>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Profile;
