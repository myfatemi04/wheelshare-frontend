export default function pickLatLong<
	T extends { latitude: number | null; longitude: number | null } | null
>(e: T): { latitude: number; longitude: number } | null {
	if (e === null) {
		return null;
	}
	if (e.latitude === null || e.longitude === null) {
		return null;
	}
	return { latitude: e.latitude, longitude: e.longitude };
}
