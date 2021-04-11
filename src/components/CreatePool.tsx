import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useEffect, useState } from 'react';
import { searchForPlaces } from '../api/google';
import { makeAPIPostCall } from '../api/utils';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-places-autocomplete';
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
	button: {
		margin: theme.spacing(1),
	},
}));

const CreatePool = () => {
	const [title, setTitle] = useState('No Title');
	const [capacity, setCapacity] = useState(0);
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const [direction, setDirection] = useState('pickup');
	const [type, setType] = useState('offer');
	const [description, setDescription] = useState('');
	const classes = useStyles();
	const [group, setGroup] = useState('');
	const [address, setAddress] = useState('');
	const handleChange = (address: string) => {
		setAddress(address);
	};

	const handleSelect = (address: string) => {
		setAddress(address);
		// geocodeByAddress(address)
		// 	.then((results) => getLatLng(results[0]))
		// 	.then((latLng) => console.log('Success', latLng))
		// 	.catch((error) => console.error('Error', error));
	};
	const onClick = () => {
		console.log(address);
		makeAPIPostCall('/pools/', {
			title,
			description,
			start_time: start,
			end_time: end,
			capacity,
			direction,
			type,
			group_id: group,
			address,
		});
	};
	useEffect(() => {}, []);
	return (
		<div className="container">
			<Card
				className={classes.root + 'd-inline-flex'}
				style={{ margin: '0.5rem', background: '#F3F5F4' }}
			>
				<CardContent>
					<div className="form-group">
						<h1 className="form-title">Create Pool</h1>
						<label className="" htmlFor="title">
							Pool Title:{' '}
						</label>
						<input
							type="text"
							id="title"
							name="title"
							className="form-control d-flex"
							placeholder="Enter title here..."
							onChange={(event) => setTitle(event.target.value)}
						></input>
					</div>
					<div className="form-group">
						<label className="" htmlFor="capacity">
							Pool Capacity:
						</label>
						<input
							type="number"
							id="capacity"
							name="capacity"
							className="form-control d-flex"
							placeholder="0"
							onChange={(event) => setCapacity(parseInt(event.target.value))}
						></input>
					</div>
					<div className="form-group">
						<label className="" htmlFor="pool_start">
							Start Time:
						</label>
						<input
							type="datetime-local"
							id="pool_start"
							name="pool_start"
							className="form-control"
							placeholder=""
							onChange={(event) => setStart(event.target.value)}
						></input>
					</div>
					<div className="form-group">
						<label className="" htmlFor="pool_end">
							End Time:
						</label>
						<input
							type="datetime-local"
							id="pool_end"
							name="pool_end"
							className="form-control"
							placeholder="Enter text here..."
							onChange={(event) => setEnd(event.target.value)}
						></input>
					</div>
					<div className="form-group">
						<label className="" htmlFor="pool_direction">
							Direction:
						</label>
						<select
							id="direction"
							name="direction"
							onChange={(event) => setDirection(event.target.value)}
						>
							<option value="pickup">Picking Up</option>
							<option value="dropoff">Dropping Off</option>
						</select>
					</div>
					<div className="form-group">
						<label className="" htmlFor="pool_type">
							Type:
						</label>
						<select
							id="type"
							name="type"
							onChange={(event) => setType(event.target.value)}
						>
							<option value="offer">Offering carpool</option>
							<option value="request">Requesting carpool</option>
						</select>
					</div>
					<div className="form-group">
						<label className="" htmlFor="title">
							Pool Description:
						</label>
						<textarea
							onChange={(event) => setDescription(event.target.value)}
							id="Pool-text"
							name="Pool-text"
							style={{ height: '200px' }}
							className="form-control"
							placeholder="Enter text here..."
						/>
					</div>
					<div className="form-group">
						<label className="" htmlFor="pool_start">
							Group:
						</label>
						<input
							type="text"
							className="form-control"
							placeholder=""
							onChange={(event) => setGroup(event.target.value)}
						></input>
					</div>
					<div className="form-group">
						{/* <label className="" htmlFor="location">
							Location:
						</label>
						<input
							type="text"
							className="form-control"
							id="location_input"
						></input>
						<button
							onClick={(e) => {
								e.preventDefault();
								let input = document.getElementById(
									'location_input'
								) as HTMLInputElement;
								let places = searchForPlaces(input.value);
								console.log(places);
							}}
						>
							Search
						</button> */}
						<PlacesAutocomplete
							value={address}
							onChange={handleChange}
							onSelect={handleSelect}
						>
							{({
								getInputProps,
								suggestions,
								getSuggestionItemProps,
								loading,
							}) => (
								<div>
									<label className="" htmlFor="address">
										Address:
									</label>
									<input
										name="address"
										id="address"
										{...getInputProps({
											placeholder: 'Search Places ...',
											className: 'location-search-input form-control',
										})}
									/>
									<div className="autocomplete-dropdown-container">
										{loading && <div>Loading...</div>}
										{suggestions.map((suggestion) => {
											const className = suggestion.active
												? 'suggestion-item--active'
												: 'suggestion-item';
											// inline style for demonstration purpose
											const style = suggestion.active
												? { backgroundColor: '#fafafa', cursor: 'pointer' }
												: { backgroundColor: '#ffffff', cursor: 'pointer' };
											return (
												<div
													{...getSuggestionItemProps(suggestion, {
														className,
														style,
													})}
												>
													<span>{suggestion.description}</span>
												</div>
											);
										})}
									</div>
								</div>
							)}
						</PlacesAutocomplete>
					</div>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						onClick={onClick}
						startIcon={<CloudUploadIcon />}
					>
						Submit
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default CreatePool;
