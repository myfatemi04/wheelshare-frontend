import logout from './Authentication/logout';
import Events from './Events';
import Groups from './Groups';
import { useMe } from './hooks';
import UIPressable from './UIPressable';
import UIPrimaryTitle from './UIPrimaryTitle';

export default function WheelShare() {
	const { name } = useMe()!;

	return (
		<>
			<UIPrimaryTitle>WheelShare</UIPrimaryTitle>

			{name}
			<UIPressable onClick={logout}>Log out</UIPressable>

			<Groups />
			<Events />
		</>
	);
}
