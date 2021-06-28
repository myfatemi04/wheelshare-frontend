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

	const result = await fetch('http://localhost:5000/api/place/' + placeId);
	const json = await result.json();

	return json;
}
