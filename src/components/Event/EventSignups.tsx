import { useMe } from '../hooks';
import latlongdist, { R_miles } from '../latlongdist';
import usePlace from '../usePlace';
import { IEvent, IEventSignup } from './Event';

export default function Signups({
	event,
	signups,
	myPlaceId,
}: {
	event: IEvent;
	signups: IEventSignup[];
	myPlaceId: string | null;
}) {
	const PADDING = '1rem';
	const placeDetails = usePlace(myPlaceId);
	const locationLongitude = event.latitude;
	const locationLatitude = event.longitude;
	const me = useMe();

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h3 style={{ marginBlockEnd: '0' }}>People</h3>
			{signups.map(({ latitude, longitude, user }) => {
				if (user.id === me?.id) {
					return null;
				}
				let extraDistance = null;
				if (placeDetails != null) {
					const myLatitude = placeDetails.latitude;
					const myLongitude = placeDetails.longitude;
					const meToThem = latlongdist(
						latitude,
						longitude,
						locationLongitude,
						locationLatitude,
						R_miles
					);
					const themToLocation = latlongdist(
						latitude,
						longitude,
						myLatitude,
						myLongitude,
						R_miles
					);
					const totalWithThem = meToThem + themToLocation;
					const totalWithoutThem = latlongdist(
						locationLongitude,
						locationLatitude,
						myLatitude,
						myLongitude,
						R_miles
					);
					extraDistance = totalWithThem - totalWithoutThem;
				}

				return (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							position: 'relative',
							padding: '1rem',
							borderRadius: '0.5rem',
							border: '1px solid #e0e0e0',
							marginTop: '0.5rem',
							marginBottom: '0.5rem',
						}}
						key={user.id}
					>
						<b>{user.name}</b>
						{extraDistance ? `: +${extraDistance.toFixed(1)} miles` : ''}
						<div
							style={{
								borderRadius: '0.5em',
								cursor: 'pointer',
								padding: '0.5em',
								position: 'absolute',
								right: PADDING,
								userSelect: 'none',
								backgroundColor: '#e0e0e0',
							}}
						>
							Invite to carpool
						</div>
					</div>
				);
			})}
		</div>
	);
}
