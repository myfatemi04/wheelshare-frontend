import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../api/google';

const center = {
	lat: 0,
	lng: -180,
};

const position = {
	lat: 37.772,
	lng: -122.214,
};

export default function PoolMap() {
	return (
		<LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
			<GoogleMap
				mapContainerStyle={{ width: '400px', height: '400px' }}
				center={center}
				onLoad={() => console.log('Loaded Base Map')}
				onTilesLoaded={() => console.log('Loaded Tile Map')}
			>
				<Marker position={position} />
			</GoogleMap>
		</LoadScript>
	);
}
