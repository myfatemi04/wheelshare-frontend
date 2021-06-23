import { useCallback, useState } from 'react';
import { IGroup } from './Group';
import UISecondaryBox from './UISecondaryBox';

export default function GroupSettingsLink({ group }: { group: IGroup }) {
	const [open, setOpen] = useState(false);
	const toggle = useCallback(() => {
		setOpen((open) => !open);
	}, []);

	return (
		<div>
			<div
				style={{
					cursor: 'pointer',
					userSelect: 'none',
					marginBottom: '1rem',
				}}
				onClick={toggle}
			>
				Settings
			</div>
			{open && (
				<UISecondaryBox>
					<h1>Settings</h1>
				</UISecondaryBox>
			)}
		</div>
	);
}
