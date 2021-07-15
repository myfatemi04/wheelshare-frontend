import { useContext } from 'react';
import useToggle from '../useToggle';
import { GroupContext } from './Group';
import GroupSettings from './GroupSettings';

export default function GroupSettingsLink() {
	const [open, toggle] = useToggle(false);
	const { group } = useContext(GroupContext);

	return (
		<div>
			<div
				style={{
					cursor: 'pointer',
					userSelect: 'none',
				}}
				onClick={toggle}
			>
				Settings
			</div>
			{open && (
				<>
					<br />
					<GroupSettings group={group} />
				</>
			)}
		</div>
	);
}
