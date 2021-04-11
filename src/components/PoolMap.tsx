import GoogleMapReact from 'google-map-react';
import { useCallback } from 'react';
import { makeAPIGetCall } from '../api/utils';

const position = { lat: 38.817, lng: -77.1679 };

export type AddressMarker = {
	user: string;
	pool: string;
	location: string;
	lat: string;
	lng: string;
};

export default function PoolMap({ pool }: { pool: Carpool.Pool }) {
	const renderMarkers = useCallback(
		(map: any, maps: any) => {
			let markers: any[] = [];
			makeAPIGetCall(`/addresses/pool/${pool._id}`).then((res) => {
				if (res.data.data) {
					res.data.data.forEach((element: AddressMarker) => {
						let marker = new maps.Marker({
							position: {
								lat: parseFloat(element.lat),
								lng: parseFloat(element.lng),
							},
							map,
							title: 'Anonymous Address',
						});
						markers.push(marker);
					});
				}
			});
		},
		[pool._id]
	);

	return (
		<div style={{ height: '50vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: 'AIzaSyDUnWIrt-H4RuP2YFLpVPz4oAjBhpOOoyI',
				}}
				defaultCenter={position}
				defaultZoom={11}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={({ map, maps }: any) => renderMarkers(map, maps)}
			/>
		</div>
	);
}
