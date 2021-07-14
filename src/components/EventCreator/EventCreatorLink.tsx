import EventCreator from './EventCreator';
import { IGroup } from '../types';
import useToggle from '../useToggle';

export default function EventCreatorLink({ group }: { group: IGroup }) {
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
