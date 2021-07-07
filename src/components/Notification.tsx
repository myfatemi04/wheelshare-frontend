import { INotification } from './Notifications';
import { useCallback } from 'react';
import { acceptInvite, acceptRequest, denyInvite, denyRequest } from './api';
import UIButton from './UIButton';

export default function Notification({
	notification,
}: {
	notification: INotification;
}) {
	const acceptReq = useCallback(() => {
		acceptRequest(notification.user.id);
	}, [notification.user.id]);

	const rejectReq = useCallback(() => {
		denyRequest(notification.user.id);
	}, [notification.user.id]);

	const acceptInv = useCallback(() => {
		acceptInvite(notification.user.id);
	}, [notification.user.id]);

	const rejectInv = useCallback(() => {
		denyInvite(notification.user.id);
	}, [notification.user.id]);

	return (
		<div className="notification">
			{notification.user.name}
			{notification.isRequest ? (
				<span> request you to join </span>
			) : (
				<span> invited you to join </span>
			)}
			{notification.carpool.name +
				' ' +
				(notification.sentTime.getMonth() + 1) +
				'/' +
				notification.sentTime.getDate() +
				'/' +
				notification.sentTime.getFullYear() +
				' ' +
				notification.sentTime.toLocaleTimeString()}
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
