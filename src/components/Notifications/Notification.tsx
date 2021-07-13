import { useCallback } from 'react';
import { acceptInvite, acceptRequest, denyInvite, denyRequest } from '../api';
import { IInvitation } from '../types';
import UIButton from '../UI/UIButton';

export default function Notification({
	notification,
}: {
	notification: IInvitation;
}) {
	const carpoolId = notification.carpool.id;

	const acceptReq = useCallback(() => {
		acceptRequest(carpoolId, notification.user.id);
	}, [carpoolId, notification.user.id]);

	const rejectReq = useCallback(() => {
		denyRequest(carpoolId, notification.user.id);
	}, [carpoolId, notification.user.id]);

	const acceptInv = useCallback(() => {
		acceptInvite(carpoolId, notification.user.id);
	}, [carpoolId, notification.user.id]);

	const rejectInv = useCallback(() => {
		denyInvite(carpoolId, notification.user.id);
	}, [carpoolId, notification.user.id]);

	const sentTime = new Date(notification.sentTime);

	return (
		<div className="notification">
			{notification.user.name}
			{notification.isRequest ? (
				<span> request you to join </span>
			) : (
				<span> invited you to join </span>
			)}
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
