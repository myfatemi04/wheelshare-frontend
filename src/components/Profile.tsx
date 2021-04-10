import React, { useState, useEffect } from 'react';

const Profile = () => {
	const [state, setState] = useState({
		user: {
			username: 'HyperionLegion',
		},
		pools: [
			{
				title: 'TJ Carpool',
				description: 'Carpool from TJ track to homes',
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
				title: 'TJ Carpool',
				description: 'Carpool from TJ track to homes',
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
				title: 'TJ Carpool',
				description: 'Carpool from TJ track to homes',
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
		<div className="" style={{ minHeight: '100vh', backgroundColor: '#F1EAE8' }}>
			<h1
				className="d-flex justify-content-center p-4"
				style={{ backgroundColor: '#F1EAE8', fontFamily: 'Courier New' }}
			>
				Profile
			</h1>
			<div className="container" style={{ fontFamily: 'Courier New' }}>
				<h2><u>{state.user.username}'s Pools</u></h2>
				<div className="">
					{state.pools.map((pool) => {
						return (
							<div
								className="text-left m-2 p-1"
								style={{minHeight: 50, minWidth: '200px', maxWidth: '200px', border: '3px #000000 solid', verticalAlign: 'center', textAlign: 'center', padding: '10px 10px 5px 10px', margin: '0px 10px 0px 10px', display: 'inline'}}>
								<a href={'pool/' + pool.id}>{pool.title}</a>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Profile;
