import GoogleMapReact from 'google-map-react';
import { makeAPIGetCall } from '../api/utils';

const position = { lat: 38.817, lng: -77.1679 };

export default function PoolMap(pool: any) {
	const renderMarkers = (map: any, maps: any) => {
		let markers: any[] = [];
		makeAPIGetCall(`/addresses/pool/${pool.pool}`).then((res) => {
			if (res.data.data) {
				res.data.data.forEach((element: any) => {
					let marker = new maps.Marker({
						position: {
							lat: parseFloat(element.lat),
							lng: parseFloat(element.lng),
						},
						map,
						title: 'Hello World!',
					});
					markers.push(marker);
				});
			}
		});

		console.log(markers);
		return markers;
	};

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
			></GoogleMapReact>
		</div>
	);
}
