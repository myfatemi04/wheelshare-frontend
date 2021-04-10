import { CenterFocusStrong } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';

const maybePluralize = (count: number, noun: string, suffix = 's') =>
	`${count} ${noun}${count !== 1 ? suffix : ''}`;

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
				participant_ids: [],
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
				participant_ids: [],
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
				participant_ids: [],
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
		<div className="bg-dark" style={{ minHeight: '100vh' }}>
			<h1
				className="d-flex justify-content-center p-4"
				style={{ backgroundColor: '#F1EAE8', fontFamily: 'Courier New' }}
			>
				Profile
			</h1>
			<div className="container" style={{ fontFamily: 'Courier New', alignSelf: 'center' }}>
				<h2 style={{color: '#FFFFFF'}}><u>{state.user.username}'s Pools</u></h2>
				<div className="">
					{state.pools.map((pool, index) => {
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
								<p className="" style={{color: '#9E6105'}}>
									{maybePluralize(pool.comments.length, 'comment')}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Profile;
