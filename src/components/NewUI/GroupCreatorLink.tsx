import { useCallback, useState } from 'react';
import GroupCreator from './GroupCreator';

export default function GroupCreatorLink() {
	const [open, setOpen] = useState(false);
	const toggle = useCallback(() => {
		setOpen((open) => !open);
	}, []);

	return (
		<div style={{ width: '100%', textAlign: 'center' }}>
			<div
				style={{
					cursor: 'pointer',
					userSelect: 'none',
				}}
				onClick={toggle}
			>
				Create Group
			</div>
			{open && (
				<>
					<br />
					<GroupCreator />
				</>
			)}
		</div>
	);
}
