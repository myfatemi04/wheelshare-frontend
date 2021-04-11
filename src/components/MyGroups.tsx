import React, { useState, useEffect } from 'react';
import { makeAPIGetCall } from '../api/utils';

const MyGroups = () => {
	const [groups, setGroups] = useState<Carpool.Group[]>([
		{
			_id: '1234',
			name: 'TJ',
			creator_id: '12345Q',
			member_ids: [],
		},
	]);

	useEffect(() => {
		makeAPIGetCall('/browse/groups').then((res) => {
			if (res.data.data) {
				setGroups(res.data.data);
			}
		});
	}, []);

	return (
		<div className="bg-dark" style={{ minHeight: '100vh' }}>
			<h1
				className="d-flex justify-content-center p-4"
				style={{ backgroundColor: '#F1EAE8', fontFamily: 'Impact' }}
			>
				My Groups
			</h1>
			<a
				className="btn btn-large btn-success"
				href="/create_group"
				style={{ fontFamily: 'Courier New' }}
			>
				Create Group
			</a>
			<div className="container" style={{ fontFamily: 'Courier New' }}>
				<br></br>
				{groups.map((group, index) => {
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
							<a href={'/groups/' + group._id} className="card-title">
								{group.name}
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MyGroups;
