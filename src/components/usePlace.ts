import { useState, useEffect, useCallback } from 'react';
import getPlaceDetails, { PlaceDetails } from '../lib/getPlaceDetails';
import useThrottle from './useThrottle';

export default function usePlace(placeId: string | null) {
	const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);

	const updatePlaceDetails = useCallback(() => {
		if (placeId == null) {
			setPlaceDetails(null);
		} else {
			getPlaceDetails(placeId).then(setPlaceDetails).catch(console.error); // TODO error handling
		}
	}, [placeId]);

	const updatePlaceDetailsThrottled = useThrottle(updatePlaceDetails, 500);

	useEffect(updatePlaceDetailsThrottled, [
		placeId,
		updatePlaceDetailsThrottled,
	]);

	return placeDetails;
}
