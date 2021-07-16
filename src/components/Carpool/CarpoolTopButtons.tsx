import { useContext, useMemo } from 'react';
import { useMe } from '../hooks';
import { CarpoolContext } from './Carpool';
import CarpoolTopButtonsMembersOnly from './CarpoolTopButtonsMembersOnly';
import CarpoolTopButtonsNonMembersOnly from './CarpoolTopButtonsNonMembersOnly';

export default function CarpoolTopButtons() {
	const me = useMe();
	const { carpool } = useContext(CarpoolContext);
	const members = carpool.members;

	const isMember = useMemo(
		() => members.some(({ id }) => id === me?.id),
		[me?.id, members]
	);

	if (isMember) {
		return <CarpoolTopButtonsMembersOnly />;
	} else {
		return <CarpoolTopButtonsNonMembersOnly />;
	}
}
