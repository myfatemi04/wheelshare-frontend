import { useEffect, useState } from 'react';
import UIPlacesAutocomplete from './UIPlacesAutocomplete';
import UISecondaryHeader from './UISecondaryHeader';
import UITimeInput from './UITimeInput';

const green = '#60f760';
const lightgrey = '#e0e0e0';

export type IEvent = {
	title: string;
	group: string;
	location: string;
	time: string;
};

export default function Event({ title, group, location, time }: IEvent) {
	const [needRideThere, setNeedRideThere] = useState(false);
	const [needRideBack, setNeedRideBack] = useState(false);
	const [rideTherePickupPlaceID, setRideTherePickupPlaceID] = useState('');
	const [rideBackDropoffPlaceID, setRideBackDropoffPlaceID] = useState('');
	const [confirmed, setConfirmed] = useState(false);

	useEffect(() => {
		console.log({ rideTherePickupPlaceID, rideBackDropoffPlaceID });
	}, [rideTherePickupPlaceID, rideBackDropoffPlaceID]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: '#f9f9f9',
				borderRadius: '0.5rem',
				padding: '1rem',
				marginBottom: '1em',
			}}
		>
			<UISecondaryHeader>{title}</UISecondaryHeader>
			<span
				style={{
					color: '#303030',
					textAlign: 'center',
				}}
			>
				{group}
			</span>
			<div
				style={{
					marginTop: '0.5rem',
				}}
			>
				<span
					style={{
						color: '#303030',
					}}
				>
					<b>Time: </b>
					{time}
				</span>
				<br />
				<span
					style={{
						color: '#303030',
					}}
				>
					<b>Location: </b>
					{location}
				</span>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					width: '100%',
					justifyContent: 'center',
					marginTop: '1rem',
				}}
			>
				<div
					style={{
						backgroundColor: needRideThere ? green : lightgrey,
						color: needRideThere ? 'white' : 'black',
						transition: 'color 0.2s, background-color 0.2s',
						padding: '1rem',
						borderRadius: '0.5em',
						textTransform: 'uppercase',
						fontWeight: 500,
						marginRight: '0.5em',
						cursor: 'pointer',
						userSelect: 'none',
					}}
					onClick={() => {
						setNeedRideThere((needRideThere) => !needRideThere);
					}}
				>
					I need a ride there
				</div>
				<div
					style={{
						backgroundColor: needRideBack ? green : lightgrey,
						color: needRideBack ? 'white' : 'black',
						transition: 'color 0.2s, background-color 0.2s',
						padding: '1rem',
						borderRadius: '0.5em',
						textTransform: 'uppercase',
						fontWeight: 500,
						marginLeft: '0.5em',
						cursor: 'pointer',
						userSelect: 'none',
					}}
					onClick={() => {
						setNeedRideBack((needRideBack) => !needRideBack);
					}}
				>
					I need a ride back
				</div>
			</div>
			{needRideThere && (
				<>
					<span
						style={{
							color: '#303030',
							textTransform: 'uppercase',
							fontWeight: 500,
							marginTop: '1em',
						}}
					>
						Ride There
					</span>
					<UIPlacesAutocomplete
						placeholder="Pickup location"
						onSelected={(address, placeID) => {
							setRideTherePickupPlaceID(placeID);
							setConfirmed(false);
						}}
					/>
					<UITimeInput />
				</>
			)}
			{needRideBack && (
				<>
					<span
						style={{
							color: '#303030',
							textTransform: 'uppercase',
							fontWeight: 500,
							marginTop: '1em',
						}}
					>
						Ride Back
					</span>
					<UIPlacesAutocomplete
						placeholder="Dropoff location"
						onSelected={(address, placeID) => {
							setRideBackDropoffPlaceID(placeID);
							setConfirmed(false);
						}}
					/>
					<UITimeInput />
				</>
			)}
			{(needRideThere || needRideBack) &&
				(rideTherePickupPlaceID || rideBackDropoffPlaceID) && (
					<div
						style={{
							backgroundColor: confirmed ? green : lightgrey,
							color: confirmed ? 'white' : 'black',
							padding: '1rem',
							borderRadius: '0.5em',
							textTransform: 'uppercase',
							fontWeight: 500,
							marginTop: '0.5em',
							cursor: 'pointer',
							userSelect: 'none',
						}}
						onClick={() => {
							setConfirmed((confirmed) => !confirmed);
						}}
					>
						{confirmed ? 'Confirmed' : 'Confirm'}
					</div>
				)}
		</div>
	);
}
