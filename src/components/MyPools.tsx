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
const MyPools = () => {
	// const id = props.match.params.id;
	const [pools, setPools] = useState([
		{
			id: 1,
			pool_title: 'TJ Carpool',
			pool_text: 'Carpool from TJ track to homes',
			start_time: '4/10/2021 3:00 PM',
			end_time: '4/10/2021 4:00 PM',
			capacity: 2,
			participants: [],
			comments: [
				'What is the covid vaccination status of all the participants?',
			],
		},
		{
			id: 2,
			pool_title: 'TJ Carpool',
			pool_text: 'Carpool from TJ track to homes',
			start_time: '4/10/2021 3:00 PM',
			end_time: '4/10/2021 4:00 PM',
			capacity: 2,
			participants: [],
			comments: [
				'What is the covid vaccination status of all the participants?',
			],
		},
		{
			id: 3,
			pool_title: 'TJ Carpool',
			pool_text: 'Carpool from TJ track to homes',
			start_time: '4/10/2021 3:00 PM',
			end_time: '4/10/2021 4:00 PM',
			capacity: 2,
			participants: [],
			comments: [
				'What is the covid vaccination status of all the participants?',
			],
		},
		{
			id: 4,
			pool_title: 'TJ Carpool',
			pool_text: 'Carpool from TJ track to homes',
			start_time: '4/10/2021 3:00 PM',
			end_time: '4/10/2021 4:00 PM',
			capacity: 2,
			participants: [],
			comments: [
				'What is the covid vaccination status of all the participants?',
			],
		},
	]);

	useEffect(() => {
		console.log(process.env);
		fetch(`${API_ENDPOINT}/my_pools`)
			.then((response) => response.json())
			.then((json) => {
				if (json) {
					setPools(json.data);
				}
			});
	}, []);

	const maybePluralize = (count: number, noun: string, suffix = 's') =>
		`${count} ${noun}${count !== 1 ? suffix : ''}`;
	const classes = useStyles();

	return (
		<div className="bg-dark" style={{ minHeight: '100vh' }}>
			<h1
				className="d-flex justify-content-center p-4"
				style={{ backgroundColor: '#F1EAE8', fontFamily: 'Impact' }}
			>
				Pools
			</h1>
			<a
				className="btn btn-large btn-success"
				href="/create_pool"
				style={{ fontFamily: 'Courier New' }}
			>
				Create Pool
			</a>
			<div className="container" style={{ fontFamily: 'Courier New' }}>
				<br></br>
				{pools.map((pool, index) => {
					let background;
					if (index % 2 === 0) {
						background = '#F1EAE8';
					} else {
						background = '#FFFFFF';
					}
					return (
						<Card className={classes.root + 'd-inline-flex'}>
							<CardActionArea>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										{pool.pool_title}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										Lizards are a widespread group of squamate reptiles, with
										over 6,000 species, ranging across all continents except
										Antarctica
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Button size="small" color="primary">
									Share
								</Button>
								<Button size="small" color="primary">
									Learn More
								</Button>
							</CardActions>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default MyPools;
