import GoogleMapReact from 'google-map-react';

const position = { lat: 39.043758, lng: -77.487442 };

export default function PoolMap() {
	const renderMarkers = (map: any, maps: any) => {
		let marker = new maps.Marker({
			position,
			map,
			title: 'Hello World!',
		});
		return marker;
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
