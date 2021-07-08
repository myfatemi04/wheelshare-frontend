import logout from './Authentication/logout';
import Events from './Events';
import Groups from './Groups/Groups';
import { useMe } from './hooks';
import UIPressable from './UI/UIPressable';
import UIPrimaryTitle from './UI/UIPrimaryTitle';

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
