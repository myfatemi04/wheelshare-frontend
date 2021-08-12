import { useContext, useDebugValue, useMemo } from 'react';
import { useMe } from '../hooks';
import { CarpoolContext } from './Carpool';

export default function useIsCreator() {
	const me = useMe();
	const carpool = useContext(CarpoolContext).carpool;
	const isCreator = useMemo(
		() => carpool?.creatorId === me?.id,
		[carpool?.creatorId, me?.id]
	);
	useDebugValue(isCreator);
	return isCreator;
}
