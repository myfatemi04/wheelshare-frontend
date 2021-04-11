export const GOOGLE_MAPS_API_KEY = 'AIzaSyDUnWIrt-H4RuP2YFLpVPz4oAjBhpOOoyI';

export async function searchForPlaces(query: string) {
	const url = new URL(
		'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'
	);
	url.searchParams.set('key', GOOGLE_MAPS_API_KEY);
	url.searchParams.set('input', query);
	url.searchParams.set('inputtype', 'textquery');
	url.searchParams.set('fields', 'place_id,name,formatted_address');

	let res = await fetch(url.toString(), { mode: 'no-cors' });
	let json = await res.json();

	return json;
}
