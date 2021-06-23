import { useEffect, useState } from 'react';
import EventStream from './EventStream';
import { IGroup } from './Group';
import GroupCreator from './GroupCreator';
import GroupList from './GroupList';
import UIPrimaryTitle from './UIPrimaryTitle';

export default function App() {
	const [groups, setGroups] = useState<IGroup[]>([]);

	useEffect(() => {
		fetch('http://localhost:5000/api/groups')
			.then((res) => res.json())
			.then(setGroups);
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '30rem',
				maxWidth: '30rem',
				marginLeft: 'auto',
				marginRight: 'auto',
			}}
		>
			<UIPrimaryTitle>WheelShare</UIPrimaryTitle>
			<GroupCreator />
			<h1>Groups</h1>
			<GroupList groups={groups} />
			<h1>Events</h1>
			<EventStream
				events={[
					{
						time: '11:00 AM to 2:45 PM',
						title: 'TJ Track Regional Meet',
						group: 'TJHSST Track and Field',
						location: 'Ashburn, Virginia',
					},
					{
						time: '5:00 PM to 8:00 PM',
						title: 'End of Year Party',
						group: 'TJHSST 2022',
						location: 'Dulles, Virginia',
					},
				]}
			/>
		</div>
	);
}
