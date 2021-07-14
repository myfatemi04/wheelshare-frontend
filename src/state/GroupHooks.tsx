import { useContext } from 'react';
import { GroupsContext, GroupState } from './GroupsProvider';

export function useGroup(id: number): GroupState | null {
	const { groups } = useContext(GroupsContext);
	return groups.get(id, null);
}
