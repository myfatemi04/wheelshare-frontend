import UIButton from '../UI/UIButton';
import UIDialogShell from '../UI/UIDialogShell';
import useToggle from '../useToggle';
import GroupCreator from './GroupCreator';

export default function GroupCreatorLink() {
	const [open, toggle] = useToggle(false);

	return (
		<div style={{ width: '100%', textAlign: 'center' }}>
			<UIButton onClick={toggle} style={{ backgroundColor: '#f3f3f3' }}>
				Create Group
			</UIButton>
			{open && (
				<UIDialogShell onClose={toggle}>
					<GroupCreator />
				</UIDialogShell>
			)}
		</div>
	);
}
