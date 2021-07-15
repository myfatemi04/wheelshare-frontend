import ActiveCarpools from './ActiveCarpools/ActiveCarpools';
import ActiveEvents from './ActiveEvents/Events';
import Groups from './Groups/Groups';

export default function WheelShare() {
	return (
		<>
			<Groups />
			<ActiveCarpools />
			<ActiveEvents />
		</>
	);
}
