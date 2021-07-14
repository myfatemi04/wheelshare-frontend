import { GroupPreview } from './GroupJoinerLink';
import { IInvitation, IEventSignup, ICarpool, IEvent, IGroup } from './types';

const base = process.env.REACT_APP_API_DOMAIN + 'api';

async function post(path: string, data: any) {
	const res = await fetch(base + path, {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('session_token'),
			'Content-Type': 'application/json',
		},
	});
	return await res.json();
}

async function delete$(path: string, body?: any) {
	const res = await fetch(base + path, {
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('session_token'),
			'Content-Type': 'application/json',
		},
		body: body ? JSON.stringify(body) : undefined,
	});
	return await res.json();
}

async function get(path: string) {
	const res = await fetch(base + path, {
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('session_token'),
		},
	});
	return await res.json();
}

export async function getEventSignups(
	eventId: number
): Promise<IEventSignup[]> {
	return await get(`/events/${eventId}/signups`);
}

export async function addOrUpdateEventSignup(
	eventId: number,
	placeId: string | null
) {
	return await post(`/events/${eventId}/signup`, {
		placeId,
	});
}

export async function removeEventSignup(eventId: number) {
	return await delete$(`/events/${eventId}/signup`);
}

export async function createEvent({
	name,
	startTime,
	duration,
	endDate,
	groupId,
	placeId,
	daysOfWeek,
}: {
	name: string;
	startTime: Date;
	duration: number;
	endDate: Date | null;
	groupId: number;
	placeId: string;
	daysOfWeek: number;
}) {
	const { id } = await post('/events', {
		name,
		startTime,
		duration,
		endDate,
		groupId,
		placeId,
		daysOfWeek,
	});
	return {
		id,
	};
}

export async function getEvents(): Promise<IEvent[]> {
	return await get('/events');
}

export async function getEvent(id: number): Promise<IEvent> {
	return await get('/events/' + id);
}

export async function getGroup(id: number): Promise<IGroup> {
	return await get('/groups/' + id);
}

export async function getGroupEvents(id: number) {
	return await get('/groups/' + id + '/events');
}

export async function getGroups() {
	return await get('/groups');
}

export async function deleteGroup(id: number) {
	return await delete$('/groups/' + id);
}

export async function createGroup(name: string) {
	const result = await post('/groups', {
		name,
	});
	return {
		id: result.id,
	};
}

export async function getNotifications() {
	return await get('/users/@me/received_requests_and_invites');
}

export async function acceptRequest(carpoolId: number, userId: number) {
	return await post(`/carpools/${carpoolId}/accept_request`, { userId });
}

export async function acceptInvite(carpoolId: number, userId: number) {
	return await post(`/carpools/${carpoolId}/accept_invite`, { userId });
}

export async function denyRequest(carpoolId: number, userId: number) {
	return await post(`/carpools/${carpoolId}/deny_request`, { userId });
}

export async function denyInvite(carpoolId: number, userId: number) {
	return await post(`/carpools/${carpoolId}/deny_invite`, { userId });
}

export async function getMe() {
	return await get('/users/@me');
}

export async function resolveCode(code: string): Promise<GroupPreview> {
	return await get('/resolve_code/' + code);
}

export async function joinGroup(id: number, code: string) {
	const result = await post('/groups/' + id + '/join', { code });
	return {
		status: result.status,
	};
}

export async function generateCode(groupId: number) {
	return await post('/groups/' + groupId + '/generate_code', {});
}

export async function resetCode(groupId: number) {
	return await post('/groups/' + groupId + '/reset_code', {});
}

export async function getReceivedInvitationsAndRequests() {
	return (await get(
		'/users/@me/received_requests_and_invites'
	)) as IInvitation[];
}

export async function getCarpool(id: number): Promise<ICarpool> {
	return await get('/carpools/' + id);
}

export async function createCarpool({
	eventId,
	name,
}: {
	eventId: number;
	name: string;
}): Promise<{ id: number }> {
	return await post('/carpools/', { eventId, name });
}

export async function sendCarpoolInvite(carpoolId: number, userId: number) {
	return await post('/carpools/' + carpoolId + '/invite', { userId });
}

export async function cancelCarpoolInvite(carpoolId: number, userId: number) {
	return await delete$('/carpools/' + carpoolId + '/invite', { userId });
}

export async function leaveCarpool(carpoolId: number) {
	return await post(`/carpools/${carpoolId}/leave`, {});
}

export async function sendCarpoolRequest(carpoolId: number) {
	return await post('/carpools/' + carpoolId + '/request', {});
}

export async function cancelCarpoolRequest(carpoolId: number) {
	return await delete$('/carpools/' + carpoolId + '/request');
}
