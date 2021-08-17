import { useEffect, useState } from 'react';
import { getGroups } from '../api';
import GroupCreatorLink from '../GroupCreator/GroupCreatorLink';
import { GroupJoiner } from '../GroupJoinerLink';
import { IGroup } from '../types';
import GroupList from './GroupList';

export default function Groups() {
	const [groups, setGroups] = useState<IGroup[]>([]);

	useEffect(() => {
		getGroups().then(setGroups).catch(console.error); // TODO error handling
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '19rem',
			}}
		>
			<h1 style={{ textAlign: 'center' }}>Groups</h1>
			<GroupJoiner />
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
