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
	const notifications = useContext(NotificationsContext);

	const invited = useMemo(
		() => notifications.invitedCarpoolIds.has(carpoolId),
		[carpoolId, notifications.invitedCarpoolIds]
	);

	const requested = useMemo(
		() => notifications.requestedCarpoolIds.has(carpoolId),
		[carpoolId, notifications.requestedCarpoolIds]
	);

	return invited ? 'invited' : requested ? 'requested' : 'none';
}
