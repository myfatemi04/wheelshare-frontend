import { useContext } from 'react';
import { GroupContext } from '../Group/Group';
import UIPressable from '../UI/UIPressable';
import useToggle from '../useToggle';
import EventCreator from './EventCreator';

export default function EventCreatorLink() {
	const [open, toggle] = useToggle(false);
	const { group } = useContext(GroupContext);

	return (
		<>
			<UIPressable onClick={toggle}>Create Event</UIPressable>
			{open && (
				<>
					<br />
					<EventCreator group={group} />
				</>
			)}
		</>
	);
}
