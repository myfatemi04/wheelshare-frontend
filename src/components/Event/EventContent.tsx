import UILink from '../UI/UILink';
import UISecondaryBox from '../UI/UISecondaryBox';
import UISecondaryHeader from '../UI/UISecondaryHeader';
import EventAdminControls from './EventAdminControls';
import EventDetails from './EventDetails';
import {
	useCurrentEventCreator,
	useCurrentEventGroup,
	useCurrentEventName,
	useIsCurrentEventCreator,
} from './EventHooks';
import EventInterestForm from './EventInterestForm';

export default function EventContent() {
	const group = useCurrentEventGroup();
	const name = useCurrentEventName();
	const creator = useCurrentEventCreator();
	const isEventCreator = useIsCurrentEventCreator();

	return (
		<UISecondaryBox style={{ width: '35rem', maxWidth: '100vw' }}>
			<div style={{ textAlign: 'center' }}>
				<UISecondaryHeader>{name}</UISecondaryHeader>
				<span>
					Created by {isEventCreator ? 'you' : creator.name}
					{group && (
						<>
							{' '}
							in <UILink href={`/groups/${group.id}`}>{group.name}</UILink>
						</>
					)}
				</span>
			</div>
			<EventDetails />
			<EventInterestForm />
			{isEventCreator && <EventAdminControls />}
		</UISecondaryBox>
	);
}
