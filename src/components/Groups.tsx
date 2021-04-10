import React, { useState, useEffect } from 'react';

const Groups = () => {
	const [state, setState] = useState({
		Groups: [
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
				Groups
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
				{state.Groups.map((group, index) => {
					return (
						<div
							className="card card-body text-left"
							style={{
								backgroundColor: index % 2 === 0 ? '#F1EAE8' : '#FFFFFF',
							}}
						>
							<form action={'/requestgroup/' + group.id} method="POST">
								<p className="card-title">{group.group_title}</p>
								<input
									type="submit"
									value="Request to Join"
									className="btn btn-success d-flex"
								/>
							</form>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Groups;