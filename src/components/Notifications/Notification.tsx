import { useCallback } from 'react';
import {
	acceptInvite,
	acceptCarpoolRequest,
	denyInvite,
	denyCarpoolRequest,
} from '../api';
import { IInvitation } from '../types';
import UIButton from '../UI/UIButton';

export default function Notification({
	notification,
}: {
	notification: IInvitation;
}) {
	const carpoolId = notification.carpool.id;

	const acceptReq = useCallback(() => {
		acceptCarpoolRequest(carpoolId, notification.user.id);
	}, [carpoolId, notification.user.id]);

	const rejectReq = useCallback(() => {
		denyCarpoolRequest(carpoolId, notification.user.id);
	}, [carpoolId, notification.user.id]);

	const acceptInv = useCallback(() => {
		acceptInvite(carpoolId);
	}, [carpoolId]);

	const rejectInv = useCallback(() => {
		denyInvite(carpoolId);
	}, [carpoolId]);

	const sentTime = new Date(notification.sentTime);

	return (
		<div className="notification">
			{notification.user.name}{' '}
			{notification.isRequest ? (
				<span>requested to join</span>
			) : (
				<span>invited you to join</span>
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
