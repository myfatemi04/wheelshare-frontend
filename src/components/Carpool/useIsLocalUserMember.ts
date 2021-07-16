import { useContext, useDebugValue, useMemo } from 'react';
import { useMe } from '../hooks';
import { CarpoolContext } from './Carpool';

export default function useIsLocalUserMember() {
	const me = useMe();
	const { carpool } = useContext(CarpoolContext);
	const members = carpool.members;

	const isMember = useMemo(
		() => members.some(({ id }) => id === me?.id),
		[me?.id, members]
	);

	useDebugValue(isMember);

	return isMember;
}
