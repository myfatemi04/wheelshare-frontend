import { ReactNode } from 'react';
import useIsLocalUserMember from './useIsLocalUserMember';

export default function Members({ children }: { children: ReactNode }) {
	const isMember = useIsLocalUserMember();

	if (isMember) {
		return <>{children}</>;
	} else {
		return null;
	}
}
