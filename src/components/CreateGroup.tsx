import { useCallback } from 'react';
import { makeAPIPostCall } from '../api/utils';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
const CreateGroup = () => {
	const [title, setTitle] = useState('No Title');
	const classes = useStyles();
	useEffect(() => {}, []);
	const onClick = () => {
		console.log({
			title: title,
		});
		makeAPIPostCall('/group', {
			title,
		});
	};

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
									Create Group
								</h1>
								<label className="" htmlFor="title">
									Group Title:{' '}
								</label>
								<input
									type="text"
									id="title"
									name="title"
									className="form-control d-flex"
									placeholder="Enter title here..."
									onChange={(event) => setTitle(event.target.value)}
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
						</form>
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default CreateGroup;
