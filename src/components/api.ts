import { GroupPreview } from './GroupJoinerLink';
import { IInvitation, IEventSignup, ICarpool, IEvent, IGroup } from './types';

export const domain =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_API_PROD
		: process.env.REACT_APP_API_LOCAL;

export const base = (() => {
	if (domain?.endsWith('/')) {
		return domain.slice(0, -1) + '/api';
	} else {
		return domain + '/api';
	}
})();

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
	const result = await res.json();
	return result;
	// if (res.ok) {
	// 	return result;
	// } else {
	// 	throw new Error(result.message);
	// }
}

export async function getEventSignupsBulk(
	eventId: number,
	userIds: number[]
): Promise<IEventSignup[]> {
	return await get(
		`/events/${eventId}/signups_bulk?userIds=${userIds.join(',')}`
	);
}

export async function getEventSignups(
	eventId: number
): Promise<IEventSignup[]> {
	return await get(`/events/${eventId}/signups`);
}

export async function addOrUpdateEventSignup(
	eventId: number,
	placeId: string | null,
	canDrive: boolean
) {
	await post(`/events/${eventId}/signup`, { placeId, canDrive });
}

export async function removeEventSignup(eventId: number) {
	await delete$(`/events/${eventId}/signup`);
}

type CreateEventProps = {
	name: string;
	startTime: Date;
	duration: number;
	endDate: Date | null;
	groupId: number;
	placeId: string;
	daysOfWeek: number;
};

export async function createEvent({
	name,
	startTime,
	duration,
	endDate,
	groupId,
	placeId,
	daysOfWeek,
}: CreateEventProps) {
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
	return await get(`/events/${id}`);
}

export async function getGroup(id: number): Promise<IGroup> {
	return await get('/groups/' + id);
}

export async function getGroupEvents(id: number): Promise<IEvent[]> {
	return await get(`/groups/${id}/events`);
}

export async function getGroups(): Promise<IGroup[]> {
	return await get('/groups');
}

export async function deleteGroup(
	id: number
): Promise<{ status: 'success' | 'error' }> {
	const { status } = await delete$('/groups/' + id);
	return { status };
}

export async function createGroup(name: string): Promise<{ id: number }> {
	const { id } = await post('/groups', { name });
	return { id };
}

export async function addGroupAdmin(
	id: number,
	userId: number
): Promise<{ status: 'success' | 'error' }> {
	const { status } = await post(`/groups/${id}/add_admin`, { userId });
	return { status };
}

export async function removeGroupAdmin(
	id: number,
	userId: number
): Promise<{ status: 'success' | 'error' }> {
	const { status } = await post(`/groups/${id}/remove_admin`, { userId });
	return { status };
}

export async function getNotifications() {
	return await get('/users/@me/received_requests_and_invites');
}

export async function acceptCarpoolRequest(carpoolId: number, userId: number) {
	return await post(`/carpools/${carpoolId}/accept_request`, { userId });
}

export async function acceptInvite(carpoolId: number) {
	return await post(`/carpools/${carpoolId}/accept_invite`, {});
}

export async function denyCarpoolRequest(carpoolId: number, userId: number) {
	return await post(`/carpools/${carpoolId}/deny_request`, { userId });
}

export async function denyInvite(carpoolId: number) {
	return await post(`/carpools/${carpoolId}/deny_invite`, {});
}

export async function getMe() {
	return await get('/users/@me');
}

export async function resolveCode(code: string): Promise<GroupPreview> {
	return await get(`/resolve_code/${code}`);
}

export async function joinGroup(id: number, code: string) {
	const result = await post(`/groups/${id}/join`, { code });
	return {
		status: result.status,
	};
}

export async function generateCode(groupId: number): Promise<string> {
	const { code } = await post(`/groups/${groupId}/generate_code`, {});

	return code;
}

export async function resetCode(groupId: number): Promise<void> {
	return await post('/groups/' + groupId + '/reset_code', {});
}

export async function getReceivedInvitationsAndRequests(): Promise<
	IInvitation[]
> {
	return await get('/users/@me/received_requests_and_invites');
}

export async function getCarpool(id: number): Promise<ICarpool> {
	return await get('/carpools/' + id);
}

type CreateCarpoolProps = {
	eventId: number;
	name: string;
	invitedUserIds: number[];
};

export async function createCarpool({
	eventId,
	name,
	invitedUserIds,
}: CreateCarpoolProps): Promise<{ id: number }> {
	const { id } = await post('/carpools/', { eventId, name, invitedUserIds });

	return { id };
}

export async function sendCarpoolInvite(carpoolId: number, userId: number) {
	await post(`/carpools/${carpoolId}/invite`, { userId });
}

export async function cancelCarpoolInvite(carpoolId: number, userId: number) {
	await delete$('/carpools/' + carpoolId + '/invite', { userId });
}

export async function leaveCarpool(carpoolId: number) {
	await post(`/carpools/${carpoolId}/leave`, {});
}

export async function sendCarpoolRequest(carpoolId: number) {
	await post('/carpools/' + carpoolId + '/request', {});
}

export async function cancelCarpoolRequest(carpoolId: number) {
	await delete$('/carpools/' + carpoolId + '/request');
}

export async function getSentRequestsAndInvites(): Promise<IInvitation[]> {
	return await get('/users/@me/sent_requests_and_invites');
}

export async function getActiveEvents(): Promise<IEvent[]> {
	return await get('/users/@me/active_events');
}

export async function getActiveCarpools(): Promise<ICarpool[]> {
	return await get('/users/@me/active_carpools');
}

export type PotentialInvitee = {
	user: {
		id: number;
		name: string;
	};
	latitude: number;
	longitude: number;
};

export async function getPotentialInvitees(
	carpoolId: number
): Promise<PotentialInvitee[]> {
	return await get(`/carpools/${carpoolId}/potential_invitees`);
}
