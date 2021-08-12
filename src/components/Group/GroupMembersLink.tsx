import { useCallback, useContext, useMemo, useState } from 'react';
import { addGroupAdmin, removeGroupAdmin } from '../api';
import { useMe } from '../hooks';
import UIDialogShell from '../UI/UIDialogShell';
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
				<UIDialogShell onClose={() => setOpen(false)}>
					<UISecondaryBox
						style={{
							textAlign: 'center',
							backgroundColor: '#fdfdfd',
							maxHeight: 'calc(100vh - 4rem)',
							position: 'relative',
						}}
					>
						<h3>Members</h3>

						<span>Member count: {group.users.length}</span>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								overflowY: 'auto',
								padding: '2rem 0.5rem',
								textAlign: 'left',
							}}
						>
							{group.users.map(({ name, id }) => (
								<div
									key={id}
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										margin: '0.5rem 0',
									}}
								>
									<span>
										{name} {adminIds.has(id) && ' (admin)'}
									</span>
									{amIAdmin &&
										(adminIds.has(id) ? (
											<button onClick={() => removeAdmin(id)}>
												Remove admin
											</button>
										) : (
											<button onClick={() => addAdmin(id, name)}>
												Make admin
											</button>
										))}
								</div>
							))}
						</div>

						<GroupInviteCode />
					</UISecondaryBox>
				</UIDialogShell>
			)}
		</>
	);
}
