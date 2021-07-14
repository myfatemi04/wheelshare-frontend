const div = document.createElement('div');
const places = new google.maps.places.PlacesService(div);

export type PlaceDetails = {
	name: string;
	formattedAddress: string;
	latitude: number;
	longitude: number;
};

const cache = new Map<string, PlaceDetails>();

export default async function getPlaceDetails(placeId: string) {
	if (cache.has(placeId)) {
		return cache.get(placeId)!;
	}

	return new Promise<PlaceDetails>((resolve, reject) => {
		places.getDetails(
			{ placeId, fields: ['name', 'formatted_address', 'geometry'] },
			(result, status) => {
				if (result || status === 'OK') {
					const place = {
						name: result.name,
						formattedAddress: result.formatted_address!,
						latitude: result.geometry!.location.lat(),
						longitude: result.geometry!.location.lng(),
					};
					cache.set(placeId, place);
					resolve(place);
				} else {
					reject(new Error('Unexpected Places status ' + status));
				}
			}
		);
	});
}
