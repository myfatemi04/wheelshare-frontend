import { IGroup } from '../types';
import useToggle from '../useToggle';
import GroupSettings from './GroupSettings';

export default function GroupSettingsLink({ group }: { group: IGroup }) {
	const [open, toggle] = useToggle(false);

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
