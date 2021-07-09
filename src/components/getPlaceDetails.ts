const div = document.createElement('div');
const places = new google.maps.places.PlacesService(div);

export type PlaceDetails = {
	name: string;
	formattedAddress: string;
	latitude: number;
	longitude: number;
};

export default async function getPlaceDetails(placeId: string) {
	return new Promise<PlaceDetails>((resolve, reject) => {
		places.getDetails(
			{ placeId, fields: ['name', 'formatted_address', 'geometry'] },
			(result, status) => {
				if (result || status === 'OK') {
					resolve({
						name: result.name,
						formattedAddress: result.formatted_address!,
						latitude: result.geometry!.location.lat(),
						longitude: result.geometry!.location.lng(),
					});
				} else {
					reject(new Error('Unexpected Places status ' + status));
				}
			}
		);
	});
}
