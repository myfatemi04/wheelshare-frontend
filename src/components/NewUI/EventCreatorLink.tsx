import { useCallback, useState } from 'react';
import EventCreator from './EventCreator';
import { IGroup } from './Group';

export default function EventCreatorLink({ group }: { group: IGroup }) {
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
				Create Event
			</div>
			{open && <EventCreator group={group} />}
		</div>
	);
}
