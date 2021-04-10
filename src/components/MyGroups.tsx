import React, { useState, useEffect } from 'react';

const MyGroups = () => {
	const [state, setState] = useState({
		MyGroups: [
			{
				id: 1,
				group_title: 'TJ',
			},
		],
	});

	const callAPI = () => {
		fetch(`${process.env.REACT_APP_API_ENDPOINT}/groups/`)
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
				{state.MyGroups.map((group, index) => {
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
							<a href={'/group/' + group.id} className="card-title">
								{group.group_title}
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MyGroups;
