import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../api/api';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
});
const Profile = () => {
	const [state, setState] = useState({
		user: {
			username: 'HyperionLegion',
		},
		pools: [
			{
				title: 'TJ Carpool',
				description: 'Carpool from TJ track to homes',
				start_time: '4/10/2021 3:00 PM',
				id: 1,
				end_time: '4/10/2021 4:00 PM',
				capacity: 2,
				participants: [],
				comments: [
					'What is the covid vaccination status of all the participants?',
				],
			},
			{
				title: 'TJ Carpool',
				description: 'Carpool from TJ track to homes',
				start_time: '4/10/2021 3:00 PM',
				id: 2,
				end_time: '4/10/2021 4:00 PM',
				capacity: 2,
				participants: [],
				comments: [
					'What is the covid vaccination status of all the participants?',
				],
			},
			{
				title: 'TJ Carpool',
				description: 'Carpool from TJ track to homes',
				start_time: '4/10/2021 3:00 PM',
				id: 3,
				end_time: '4/10/2021 4:00 PM',
				capacity: 2,
				participants: [],
				comments: [
					'What is the covid vaccination status of all the participants?',
				],
			},
		],
		groups: [],
	});
	const classes = useStyles();

	const callAPI = () => {
		fetch(`${process.env.REACT_APP_API_ENDPOINT}/profile/`)
			.then((response) => response.json())
			.then((data) => {
				if (data !== undefined) {
					setState(data);
				}
			});
	};

	useEffect(() => {
		callAPI();
	}, []);
	return (
		<div
			className=""
			style={{ minHeight: '100vh', backgroundColor: '#F1EAE8' }}
		>
			<h1
				className="d-flex justify-content-center p-4"
				style={{ backgroundColor: '#F1EAE8', fontFamily: 'Courier New' }}
			>
				Profile
			</h1>
			<div className="container" style={{ fontFamily: 'Courier New' }}>
				<h2>
					<u>{state.user.username}'s Pools</u>
				</h2>
				<div className="">
					{state.pools.map((pool) => {
						return (
							<Card className={classes.root + 'd-inline-flex'}>
								<CardActionArea href={'/pool/' + pool.id}>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											{pool.title}
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{pool.description}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>
									<Button
										size="small"
										color="primary"
										onClick={() => {
											let link: string = 'localhost:3000/pool/' + pool.id;
											navigator.clipboard.writeText(link);
										}}
									>
										Share
									</Button>
									<Button
										href={'/pool/' + pool.id}
										size="small"
										color="primary"
									>
										Learn More
									</Button>
								</CardActions>
							</Card>
						);
					})}
				</div>
			</div>
			<script></script>
		</div>
	);
};

export default Profile;
