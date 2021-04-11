import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Box from '@material-ui/core/Box';
import { makeAPIGetCall } from '../api/utils';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		justifyContent: 'center',
	},
	media: {
		height: 140,
	},
	button: {
		margin: theme.spacing(1),
		background: '#40E0D0',
		'&:hover': {
			background: '#FFFFFF',
		},
	},
}));
const Groups = () => {
	const classes = useStyles();
	const [state, setState] = useState({
		MyGroups: [
			{
				id: 1,
				group_title: 'TJ',
			},
		],
	});

	const callAPI = () => {
		fetch(`${process.env.REACT_APP_API_ENDPOINT}/groups/`)
			.then((response) => response.json())
			.then((data) => {
				if (data !== undefined) {
					setState(data);
				}
			});
	};
	const [groups, setGroups] = useState<Carpool.Group[]>([
		{
			_id: '1234',
			name: 'TJ',
			creator_id: 'michael',
			member_ids: [],
		},
	]);

	useEffect(() => {
		makeAPIGetCall('/browse/groups').then((res) => {
			if (res.data.data) {
				setGroups(res.data.data);
			}
		});
	}, []);

	return (
		<div
			className=""
			style={{ minHeight: '100vh', backgroundColor: '#F1EAE8' }}
		>
			<h1
				className="d-flex justify-content-center p-4"
				style={{ backgroundColor: '#F1EAE8' }}
			>
				Groups
			</h1>
			<Box textAlign="center">
				<Button
					variant="contained"
					className={classes.button}
					startIcon={<CloudUploadIcon />}
					href="/create_group"
				>
					Create Group
				</Button>
			</Box>
			<div className="container" style={{ fontFamily: 'Courier New' }}>
				<br></br>

				{groups.map((group, index) => {
					return (
						<Card
							className={classes.root + 'd-inline-flex'}
							style={{ margin: '0.5rem' }}
						>
							<CardActionArea href={'/group/' + group._id}>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										{group.name}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									></Typography>
								</CardContent>
							</CardActionArea>

							<CardActions>
								<Button
									size="small"
									color="primary"
									onClick={() => {
										alert('Copied to Clipboard');
										let link: string = 'localhost:3000/group/' + group._id;
										navigator.clipboard.writeText(link);
									}}
								>
									Share
								</Button>
								<Button
									href={'/group/' + group._id}
									size="small"
									color="primary"
								>
									Learn More
								</Button>
								<form action={'/requestgroup/' + group._id} method="POST">
									<input
										type="submit"
										value="Request to Join"
										className="btn btn-success d-flex"
									/>
								</form>
							</CardActions>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default Groups;
