import { useState, useEffect, useCallback } from 'react';
import { getPlaceDetails, PlaceDetails } from '../../api/google';
import useThrottle from './useThrottle';

export default function usePlace(placeId: string | null) {
	const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);

	const updatePlaceDetails = useCallback(() => {
		if (placeId == null) {
			setPlaceDetails(null);
		} else {
			getPlaceDetails(placeId).then(setPlaceDetails);
		}
	}, [placeId]);

	const updatePlaceDetailsThrottled = useThrottle(updatePlaceDetails, 500);

	useEffect(updatePlaceDetailsThrottled, [
		placeId,
		updatePlaceDetailsThrottled,
	]);

	return placeDetails;
}
