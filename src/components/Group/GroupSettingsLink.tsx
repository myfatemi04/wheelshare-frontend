import { useContext } from 'react';
import UIDialogShell from '../UI/UIDialogShell';
import UIPressable from '../UI/UIPressable';
import useToggle from '../useToggle';
import { GroupContext } from './Group';
import GroupSettings from './GroupSettings';

export default function GroupSettingsLink() {
	const [open, toggle] = useToggle(false);
	const { group } = useContext(GroupContext);

	return (
		<>
			<UIPressable onClick={toggle}>Settings</UIPressable>
			{open && (
				<UIDialogShell onClose={toggle}>
					<GroupSettings group={group} />
				</UIDialogShell>
			)}
		</>
	);
}
