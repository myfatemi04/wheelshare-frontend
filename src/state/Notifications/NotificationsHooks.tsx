import { useMemo } from 'react';
import { useContext } from 'react';
import { NotificationsContext } from './NotificationsProvider';

export function useSendCarpoolRequest() {
	return useContext(NotificationsContext).sendCarpoolRequest;
}

export function useCancelCarpoolRequest() {
	return useContext(NotificationsContext).cancelCarpoolRequest;
}

export function useInvitationState(
	carpoolId: number
): 'invited' | 'requested' | 'none' {
	const { invitedCarpoolIds, requestedCarpoolIds } =
		useContext(NotificationsContext);

	const invited = useMemo(
		() => carpoolId in invitedCarpoolIds,
		[carpoolId, invitedCarpoolIds]
	);

	const requested = useMemo(
		() => carpoolId in requestedCarpoolIds,
		[carpoolId, requestedCarpoolIds]
	);

	return invited ? 'invited' : requested ? 'requested' : 'none';
}
