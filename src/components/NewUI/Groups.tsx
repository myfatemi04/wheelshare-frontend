import { useState, useEffect } from 'react';
import { IGroup } from './Group';
import GroupCreatorLink from './GroupCreatorLink';
import GroupList from './GroupList';

export default function Groups() {
	const [groups, setGroups] = useState<IGroup[]>([]);

	useEffect(() => {
		fetch('http://localhost:5000/api/groups')
			.then((res) => res.json())
			.then(setGroups);
	}, []);

	return (
		<>
			<h1>Groups</h1>
			<GroupCreatorLink />
			<br />
			<GroupList groups={groups} />
		</>
	);
}
