import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useMe } from '../hooks';
import latlongdist, { R_miles } from '../../lib/latlongdist';
import { IEventSignup, IEvent } from '../types';
import usePlace from '../usePlace';
import { useMemo } from 'react';

export default function EventSignups({
	event,
	signups,
	myPlaceId,
}: {
	event: IEvent;
	signups: IEventSignup[];
	myPlaceId: string | null;
}) {
	const carpools = event.carpools;
	const placeDetails = usePlace(myPlaceId);
	const locationLongitude = event.latitude;
	const locationLatitude = event.longitude;
	const me = useMe();

	const signupsWithoutCarpool = useMemo(() => {
		// A list of users not in any carpool
		const members = carpools.map((c) => c.members);
		const allMembers = members.reduce((a, b) => a.concat(b), []);
		const allMembersIds = allMembers.map((m) => m.id);
		return signups.filter((s) => !allMembersIds.includes(s.user.id));
	}, [signups, carpools]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h3 style={{ marginBlockEnd: '0' }}>People without a carpool</h3>
			{signupsWithoutCarpool.map(({ latitude, longitude, user }) => {
				if (user.id === me?.id) {
					return null;
				}
				let extraDistance = null;
				if (
					placeDetails != null &&
					!(latitude === null || longitude === null)
				) {
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
							justifyContent: 'space-between',
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
						<PersonAddIcon
							onClick={() => {
								// Invite to carpool and create carpool
							}}
						/>
					</div>
				);
			})}
		</div>
	);
}
