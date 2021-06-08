import { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const green = '#60f760';
const lightgrey = '#e0e0e0';

export default function Event({
	title,
	group,
	location,
	time,
}: {
	title: string;
	group: string;
	location: string;
	time: string;
}) {
	const [needRideThere, setNeedRideThere] = useState(false);
	const [needRideBack, setNeedRideBack] = useState(false);
	const [rideThereLocation, setRideThereLocation] = useState('');
	const [rideBackLocation, setRideBackLocation] = useState('');

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
			<h2
				style={{
					marginTop: '0rem',
					marginBottom: '0.25em',
					textAlign: 'center',
				}}
			>
				{title}
			</h2>
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
					<PlacesAutocomplete
						onChange={(address) => setRideThereLocation(address)}
						value={rideThereLocation}
					>
						{({
							getInputProps,
							getSuggestionItemProps,
							suggestions,
							loading,
						}) => (
							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<input
									{...getInputProps({
										style: {
											marginTop: '0.5em',
											padding: '0.5em',
											fontSize: '1.25rem',
											borderRadius: '0.5em',
											border: '0px',
											zIndex: 1,
										},
										placeholder: 'Where would you be picked up?',
									})}
								/>
								{loading
									? 'Loading'
									: suggestions.length > 0 && (
											<div
												style={{
													marginTop: '-1em',
													paddingTop: '2em',
													paddingBottom: '1em',
													paddingLeft: '1em',
													paddingRight: '1em',
													borderBottomLeftRadius: '0.5em',
													borderBottomRightRadius: '0.5em',
													backgroundColor: 'white',
												}}
											>
												{suggestions.map((suggestion) => (
													<div
														{...getSuggestionItemProps(suggestion)}
														style={{
															cursor: 'pointer',
														}}
														key={suggestion.placeId}
													>
														{suggestion.description}
													</div>
												))}
											</div>
									  )}
							</div>
						)}
					</PlacesAutocomplete>
					<input
						type="time"
						style={{
							marginTop: '0.5em',
							padding: '0.5em',
							fontFamily: 'Inter',
							fontSize: '1.25rem',
							borderRadius: '0.5em',
							border: '0px',
						}}
					/>
				</>
			)}
			{needRideBack && (
				<>
					<PlacesAutocomplete
						onChange={(address) => setRideBackLocation(address)}
						value={rideBackLocation}
					>
						{({
							getInputProps,
							getSuggestionItemProps,
							suggestions,
							loading,
						}) => (
							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<input
									{...getInputProps({
										style: {
											marginTop: '0.5em',
											padding: '0.5em',
											fontSize: '1.25rem',
											borderRadius: '0.5em',
											border: '0px',
											zIndex: 1,
										},
										placeholder: 'Where would you be dropped off?',
									})}
								/>
								{loading
									? 'Loading'
									: suggestions.length > 0 && (
											<div
												style={{
													marginTop: '-1em',
													paddingTop: '2em',
													paddingBottom: '1em',
													paddingLeft: '1em',
													paddingRight: '1em',
													borderBottomLeftRadius: '0.5em',
													borderBottomRightRadius: '0.5em',
													backgroundColor: 'white',
												}}
											>
												{suggestions.map((suggestion) => (
													<div
														{...getSuggestionItemProps(suggestion)}
														style={{
															cursor: 'pointer',
														}}
														key={suggestion.placeId}
													>
														{suggestion.description}
													</div>
												))}
											</div>
									  )}
							</div>
						)}
					</PlacesAutocomplete>
					<input
						type="time"
						style={{
							marginTop: '0.5em',
							padding: '0.5em',
							fontFamily: 'Inter',
							fontSize: '1.25rem',
							borderRadius: '0.5em',
							border: '0px',
						}}
					/>
				</>
			)}
		</div>
	);
}
