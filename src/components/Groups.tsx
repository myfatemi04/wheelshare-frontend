import { useState, useEffect } from 'react';
import { IGroup } from './Group';
import GroupCreatorLink from './GroupCreatorLink';
import GroupJoinerLink from './GroupJoinerLink';
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
			<GroupJoinerLink />
			<br />
			<GroupCreatorLink />
			<br />
			{groups.length > 0 ? (
				<GroupList groups={groups} />
			) : (
				<span>
					You aren't in any groups. You can create your own by clicking 'create
					group' above, or join one by asking an admin of the group to send you
					an invite link.
				</span>
			)}
		</>
	);
}
