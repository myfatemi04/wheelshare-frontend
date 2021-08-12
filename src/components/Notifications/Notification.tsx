import { useCallback, useContext } from 'react';
import { NotificationsContext } from '../../state/Notifications/NotificationsProvider';
import { acceptCarpoolRequest, denyCarpoolRequest } from '../api';
import { IInvitation } from '../types';
import UIButton from '../UI/UIButton';

export default function Notification({
	notification,
	refresh,
}: {
	notification: IInvitation;
	refresh: () => void;
}) {
	const carpoolId = notification.carpool.id;

	const notifs = useContext(NotificationsContext);

	const acceptReq = useCallback(() => {
		acceptCarpoolRequest(carpoolId, notification.user.id).finally(refresh);
	}, [carpoolId, notification.user.id, refresh]);

	const rejectReq = useCallback(() => {
		denyCarpoolRequest(carpoolId, notification.user.id).finally(refresh);
	}, [carpoolId, notification.user.id, refresh]);

	const acceptInv = useCallback(() => {
		notifs.acceptCarpoolInvite(carpoolId);
	}, [carpoolId, notifs]);

	const rejectInv = useCallback(() => {
		notifs.denyCarpoolInvite(carpoolId);
	}, [carpoolId, notifs]);

	const sentTime = new Date(notification.sentTime);

	return (
		<div className="notification">
			{notification.isRequest ? (
				<span>{notification.user.name} requested to join</span>
			) : (
				<span>You're invited to join</span>
			)}{' '}
			{notification.carpool.name + ' at ' + sentTime.toLocaleString()}
			{notification.isRequest ? (
				<div className="notification-buttons" style={{ display: 'flex' }}>
					<UIButton onClick={acceptReq}>Accept</UIButton>
					<UIButton onClick={rejectReq}>Reject</UIButton>
				</div>
			) : (
				<div className="notification-buttons" style={{ display: 'flex' }}>
					<UIButton onClick={acceptInv}>Accept</UIButton>
					<UIButton onClick={rejectInv}>Reject</UIButton>
				</div>
			)}
		</div>
	);
}
