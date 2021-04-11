import { useState, useEffect } from 'react';
import { makeAPIGetCall } from '../api/utils';

const Groups = () => {
	const [groups, setGroups] = useState<Carpool.Group[]>([
		{
			_id: '1234',
			name: 'TJ',
			creator_id: 'michael',
			member_ids: [],
		},
	]);

	useEffect(() => {
		makeAPIGetCall('/groups').then((res) => {
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
				{groups.map((group, index) => {
					return (
						<div
							className="card card-body text-left"
							style={{
								backgroundColor: index % 2 === 0 ? '#F1EAE8' : '#FFFFFF',
							}}
						>
							<form action={'/requestgroup/' + group._id} method="POST">
								<p className="card-title">{group.name}</p>
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
