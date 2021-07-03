export async function post(path: string, data: any) {
	const res = await fetch('http://localhost:5000/api' + path, {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return await res.json();
}

export async function delete$(path: string) {
	const res = await fetch('http://localhost:5000/api' + path, {
		method: 'delete',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return await res.json();
}

export async function get(path: string) {
	const res = await fetch('http://localhost:5000/api' + path);
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

export async function removeEventSignup(eventId: number) {
	return await delete$(`/events/${eventId}/signup`);
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

export async function getMe() {
	return await get('/users/@me');
}
