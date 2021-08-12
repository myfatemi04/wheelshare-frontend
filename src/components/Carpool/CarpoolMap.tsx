import { Map, Marker } from 'google-maps-react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useMe } from '../hooks';
import { CarpoolContext } from './Carpool';
import useSignups from './useSignups';

function ll(x: { latitude: number; longitude: number }) {
	return { lat: x.latitude, lng: x.longitude };
}

const CarpoolMap = () => {
	const { carpool } = useContext(CarpoolContext);
	const memberIds = useMemo(
		() => carpool.members.map((m) => m.id),
		[carpool.members]
	);
	const signups = useSignups(carpool.event.id, memberIds);
	const me = useMe();
	const mySignup = useMemo(
		() => signups.find((s) => s.user.id === me?.id),
		[me?.id, signups]
	);
	const [map, setMap] = useState<google.maps.Map | null>(null);

	useEffect(() => {
		const bounds = new google.maps.LatLngBounds();
		for (let signup of signups) {
			if (signup.latitude) {
				bounds.extend(ll(signup));
			}
		}
		bounds.extend(ll(carpool.event));
		map?.fitBounds(bounds);
		map?.setZoom(map.getZoom() - 1);
	}, [carpool.event, map, signups]);

	return (
		<Map
			google={google}
			style={{ width: '100%', height: '100%' }}
			containerStyle={{
				width: 'min(30rem, 100%)',
				height: '25rem',
				position: 'relative',
				borderRadius: '0.5rem',
				overflow: 'hidden',
			}}
			onReady={(_, map) => map && setMap(map)}
		>
			{signups.map(
				(signup) =>
					signup.user.id !== me?.id &&
					signup.latitude && (
						<Marker
							key={signup.user.id}
							position={ll(signup)}
							title={signup.user.name}
							icon="/markers/blue.png"
						/>
					)
			)}

			<Marker
				key="event"
				position={ll(carpool.event)}
				icon="/markers/green.png"
			/>
			{mySignup?.latitude && (
				<Marker key="me" position={ll(mySignup)} icon="/markers/red.png" />
			)}
		</Map>
	);
};

export default CarpoolMap;
