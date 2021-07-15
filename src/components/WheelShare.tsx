import ActiveCarpools from './ActiveCarpools/ActiveCarpools';
import ActiveEvents from './ActiveEvents/Events';
import Groups from './Groups/Groups';
import Header from './Header/Header';

export default function WheelShare() {
	return (
		<>
			<Header />

			<Groups />
			<ActiveCarpools />
			<ActiveEvents />
		</>
	);
}
