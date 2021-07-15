import { useContext } from 'react';
import { GroupContext } from '../Group/Group';
import useToggle from '../useToggle';
import EventCreator from './EventCreator';

export default function EventCreatorLink() {
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
				Create Event
			</div>
			{open && (
				<>
					<br />
					<EventCreator group={group} />
				</>
			)}
		</div>
	);
}
