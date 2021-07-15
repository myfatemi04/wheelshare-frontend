import { useContext } from 'react';
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
				<>
					<br />
					<GroupSettings group={group} />
				</>
			)}
		</>
	);
}
