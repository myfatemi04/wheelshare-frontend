import { FormEventHandler } from 'react';
import { makeAPIPostCall } from '../api/utils';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useState, useEffect } from 'react';
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

	const onClick = () => {
		console.log({
			title: title,
			description: description,
			start_time: start,
			end_time: end,
			capacity,
			direction,
			type,
		});
		makeAPIPostCall('/pool', {
			title: title,
			description: description,
			start_time: start,
			end_time: end,
			capacity,
			direction,
			type,
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
					<Typography gutterBottom variant="h5" component="h2"></Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						<form>
							<div className="form-group">
								<h1 className="form-title" style={{ fontFamily: 'Impact' }}>
									Create Pool
								</h1>
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
									onChange={(event) =>
										setCapacity(parseInt(event.target.value))
									}
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
									<option value="request">Requesting carpooll</option>
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

							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								onClick={onClick}
								startIcon={<CloudUploadIcon />}
							>
								Submit
							</Button>
							<br />
						</form>
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default CreatePool;
