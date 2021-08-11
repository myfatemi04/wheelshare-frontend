import { useCallback, useContext, useMemo, useState } from 'react';
import { addGroupAdmin, removeGroupAdmin } from '../api';
import { useMe } from '../hooks';
import UIPressable from '../UI/UIPressable';
import UISecondaryBox from '../UI/UISecondaryBox';
import { GroupContext } from './Group';
import GroupInviteCode from './GroupInviteCode';

export default function GroupMembersLink() {
	const [open, setOpen] = useState(false);

	const { group } = useContext(GroupContext);
	const me = useMe();

	const handleClick = useCallback(() => setOpen((o) => !o), []);

	const adminIds = useMemo(
		() => new Set(group.admins.map((a) => a.id)),
		[group.admins]
	);

	const addAdmin = useCallback(
		(adminId: number, adminName: string) => {
			addGroupAdmin(group.id, adminId).then(({ status }) => {
				if (status === 'success') {
					group.admins.push({ id: adminId, name: adminName });
				}
			});
		},
		[group.admins, group.id]
	);

	const amIAdmin = me?.id ? adminIds.has(me.id) : false;

	const removeAdmin = useCallback(
		(adminId: number) => {
			removeGroupAdmin(group.id, adminId).then((res) => {
				if (res.status === 'success') {
					group.admins = group.admins.filter((admin) => admin.id !== adminId);
				}
			});
		},
		[group]
	);

	return (
		<>
			<UIPressable onClick={handleClick}>Members</UIPressable>
			{open && (
				<>
					<br />
					<UISecondaryBox style={{ width: '100%', textAlign: 'center' }}>
						<h1>Members</h1>

						{group.users.map(({ name, id }) => (
							<span key={id}>
								{name} {adminIds.has(id) && ' (admin)'}{' '}
								{amIAdmin &&
									(adminIds.has(id) ? (
										<button onClick={() => removeAdmin(id)}>
											Remove as admin
										</button>
									) : (
										<button onClick={() => addAdmin(id, name)}>
											Add as admin
										</button>
									))}
							</span>
						))}
						<br />

						<GroupInviteCode />
					</UISecondaryBox>
				</>
			)}
		</>
	);
}
