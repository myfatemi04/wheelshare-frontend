async function post(path: string, data: any) {
	const res = await fetch('http://localhost:5000/api' + path, {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('session_token'),
			'Content-Type': 'application/json',
		},
	});
	return await res.json();
}

async function delete$(path: string) {
	const res = await fetch('http://localhost:5000/api' + path, {
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('session_token'),
			'Content-Type': 'application/json',
		},
	});
	return await res.json();
}

async function get(path: string) {
	const res = await fetch('http://localhost:5000/api' + path, {
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('session_token'),
		},
	});
	return await res.json();
}

export type PlaceDetails = {
	formattedAddress: string;
	latitude: number;
	longitude: number;
};

export async function getPlaceDetails(
	placeId: string
): Promise<PlaceDetails | null> {
	if (placeId == null) {
		console.warn('placeId was null');
		return null;
	}

	return await get('/place/' + placeId);
}

export async function addEventSignup(eventId: number, placeId: string) {
	post(`/events/${eventId}/signup`, {
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

export async function getEvents() {
	return await get('/events');
}

export async function getGroup(id: number) {
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

export async function getMe() {
	return await get('/users/@me');
}
