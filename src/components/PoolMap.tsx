import GoogleMapReact from 'google-map-react';

const position = { lat: 39.043758, lng: -77.487442 };

export default function PoolMap() {
	return (
		<div style={{ height: '50vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: 'AIzaSyDUnWIrt-H4RuP2YFLpVPz4oAjBhpOOoyI',
				}}
				defaultCenter={position}
				defaultZoom={11}
			></GoogleMapReact>
		</div>
	);
}
