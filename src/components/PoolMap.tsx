import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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
		<MapContainer center={position} zoom={13} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
}
