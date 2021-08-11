import { useEffect, useState } from 'react';
import { getGroups } from '../api';
import { IGroup } from '../types';
import GroupCreatorLink from '../GroupCreator/GroupCreatorLink';
import GroupJoinerLink from '../GroupJoinerLink';
import GroupList from './GroupList';

export default function Groups() {
	const [groups, setGroups] = useState<IGroup[]>([]);

	useEffect(() => {
		getGroups().then(setGroups);
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<h1 style={{ textAlign: 'center' }}>Groups</h1>
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
		</div>
	);
}
