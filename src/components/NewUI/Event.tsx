import { useState } from 'react';
import UIButton from './UIButton';
import UIPlacesAutocomplete from './UIPlacesAutocomplete';
import UISecondaryBox from './UISecondaryBox';
import UISecondaryHeader from './UISecondaryHeader';

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

function GroupName({ name }: { name: string }) {
	return (
		<span
			style={{
				color: '#303030',
				textAlign: 'center',
			}}
		>
			{name}
		</span>
	);
}

function Details({
	startTime,
	endTime,
	formattedAddress,
}: {
	startTime: string;
	endTime: string;
	formattedAddress: string;
}) {
	return (
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
	);
}

export default function Event({
	name,
	group,
	formattedAddress,
	startTime,
	endTime,
}: IEvent) {
	const [haveRideThere, setHaveRideThere] = useState(false);
	const [haveRideBack, setHaveRideBack] = useState(false);
	const [rideTherePickupPlaceID, setRideTherePickupPlaceID] = useState<string>(
		null!
	);
	const [rideBackDropoffPlaceID, setRideBackDropoffPlaceID] = useState<string>(
		null!
	);
	const [interested, setInterested] = useState(false);

	return (
		<UISecondaryBox>
			<UISecondaryHeader>{name}</UISecondaryHeader>
			<GroupName name={group} />
			<Details {...{ startTime, endTime, formattedAddress }} />
			<UIButton
				onClick={() => setInterested((i) => !i)}
				style={{
					backgroundColor: interested ? green : lightgrey,
					color: interested ? 'white' : 'black',
					transition: 'color 0.2s, background-color 0.2s',
				}}
			>
				{interested ? 'Interested' : 'Not interested'}
			</UIButton>
			{interested && (
				<>
					<UIPlacesAutocomplete
						placeholder="Pickup location"
						onSelected={(address, placeID) => {
							setRideTherePickupPlaceID(placeID);
						}}
						style={
							rideTherePickupPlaceID != null
								? { border: '2px solid ' + green }
								: {}
						}
					/>
					<UIPlacesAutocomplete
						placeholder="Dropoff location"
						onSelected={(address, placeID) => {
							setRideBackDropoffPlaceID(placeID);
						}}
						style={
							rideBackDropoffPlaceID != null
								? { border: '2px solid ' + green }
								: {}
						}
					/>

					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							width: '100%',
							justifyContent: 'center',
						}}
					>
						<UIButton
							style={{
								backgroundColor: haveRideThere ? green : lightgrey,
								color: haveRideThere ? 'white' : 'black',
								transition: 'color 0.2s, background-color 0.2s',
								marginRight: '0.5em',
							}}
							onClick={() => {
								setHaveRideThere((haveRideThere) => !haveRideThere);
							}}
						>
							I have a ride there
						</UIButton>
						<UIButton
							style={{
								backgroundColor: haveRideBack ? green : lightgrey,
								color: haveRideBack ? 'white' : 'black',
								transition: 'color 0.2s, background-color 0.2s',
								marginLeft: '0.5em',
							}}
							onClick={() => {
								setHaveRideBack((haveRideBack) => !haveRideBack);
							}}
						>
							I have a ride back
						</UIButton>
					</div>
				</>
			)}
		</UISecondaryBox>
	);
}
