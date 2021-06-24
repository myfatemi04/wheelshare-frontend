import { useState } from 'react';
import UIButton from './UIButton';
import UIPlacesAutocomplete from './UIPlacesAutocomplete';
import UISecondaryBox from './UISecondaryBox';
import UISecondaryHeader from './UISecondaryHeader';
import UITimeInput from './UITimeInput';

const green = '#60f760';
const lightgrey = '#e0e0e0';

export type IEvent = {
	name: string;
	group: string;
	formattedAddress: string;
	startTime: string;
	endTime: string;
};

function formatStartAndEndTime(
	startDatetimeString: string,
	endDatetimeString: string
) {
	const startDatetime = new Date(startDatetimeString);
	const endDatetime = new Date(endDatetimeString);

	if (isNaN(startDatetime.valueOf())) {
		console.error('Invalid datetime:', startDatetimeString);
		return '(invalid)';
	}
	if (isNaN(endDatetime.valueOf())) {
		console.error('Invalid datetime:', startDatetimeString);
		return '(invalid)';
	}

	const startDateString = startDatetime.toLocaleDateString();
	const endDateString = endDatetime.toLocaleDateString();

	if (startDateString === endDateString) {
		const startTimeString = startDatetime.toLocaleTimeString();
		const endTimeString = endDatetime.toLocaleTimeString();
		return `${startDateString}, ${startTimeString} - ${endTimeString}`;
	} else {
		return `${startDatetime.toLocaleString()} - ${endDatetime.toLocaleString()}`;
	}
}

export default function Event({
	name,
	group,
	formattedAddress,
	startTime,
	endTime,
}: IEvent) {
	const [needRideThere, setNeedRideThere] = useState(false);
	const [needRideBack, setNeedRideBack] = useState(false);
	const [rideTherePickupPlaceID, setRideTherePickupPlaceID] = useState('');
	const [rideBackDropoffPlaceID, setRideBackDropoffPlaceID] = useState('');
	const [confirmed, setConfirmed] = useState(false);

	return (
		<UISecondaryBox>
			<UISecondaryHeader>{name}</UISecondaryHeader>
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
					textAlign: 'left',
				}}
			>
				<span
					style={{
						color: '#303030',
					}}
				>
					<b>When: </b>
					{formatStartAndEndTime(startTime, endTime)}
				</span>
				<br />
				<br />
				<span
					style={{
						color: '#303030',
					}}
				>
					<b>Where: </b>
					{formattedAddress}
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
				<UIButton
					style={{
						backgroundColor: needRideThere ? green : lightgrey,
						color: needRideThere ? 'white' : 'black',
						transition: 'color 0.2s, background-color 0.2s',
						marginRight: '0.5em',
					}}
					onClick={() => {
						setNeedRideThere((needRideThere) => !needRideThere);
					}}
				>
					I need a ride there
				</UIButton>
				<UIButton
					style={{
						backgroundColor: needRideBack ? green : lightgrey,
						color: needRideBack ? 'white' : 'black',
						transition: 'color 0.2s, background-color 0.2s',
						marginLeft: '0.5em',
					}}
					onClick={() => {
						setNeedRideBack((needRideBack) => !needRideBack);
					}}
				>
					I need a ride back
				</UIButton>
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
					<UIButton
						style={{
							backgroundColor: confirmed ? green : lightgrey,
							color: confirmed ? 'white' : 'black',
						}}
						onClick={() => {
							setConfirmed((confirmed) => !confirmed);
						}}
					>
						{confirmed ? 'Confirmed' : 'Confirm'}
					</UIButton>
				)}
		</UISecondaryBox>
	);
}
