import ActiveCarpools from './ActiveCarpools/ActiveCarpools';
import ActiveEvents from './ActiveEvents/Events';
import Groups from './Groups/Groups';
import UITwoColumns from './UI/UITwoColumns';

export default function WheelShare() {
	return (
		<UITwoColumns
			firstFlex={1}
			first={
				<>
					<ActiveCarpools />
					<Groups />
				</>
			}
			secondFlex={2}
			second={<ActiveEvents />}
		/>
	);
}
