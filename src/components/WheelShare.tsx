import logout from './Authentication/logout';
import Carpool from './Carpool';
import Events from './Events';
import Groups from './Groups';
import { useMe } from './hooks';
import UIPressable from './UIPressable';
import UIPrimaryTitle from './UIPrimaryTitle';

export default function WheelShare() {
	const user = useMe()!;

	return (
		<>
			<UIPrimaryTitle>WheelShare</UIPrimaryTitle>

			<Carpool
				carpool={{
					name: 'Carpool',
					id: 0,
					description: 'Test carpool',
					eventId: null,
					members: [],
					invitations: [],
				}}
			/>

			{user.name}
			<UIPressable onClick={logout}>Log out</UIPressable>

			<Groups />
			<Events />
		</>
	);
}
