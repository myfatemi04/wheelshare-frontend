import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useContext, useEffect, useState } from 'react';
import { makeAPIGetCall } from '../api/utils';
import AuthenticationContext from './AuthenticationContext';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
});

const Profile = () => {
	const { user, isLoggedIn } = useContext(AuthenticationContext);
	const [groups, setGroups] = useState<Carpool.Group[]>([]);
	const [pools, setPools] = useState<Carpool.Pool[]>([
		/*
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
	*/
	]);
	const classes = useStyles();

	useEffect(() => {
		makeAPIGetCall('/my_pools').then((res) => {
			if (res.data.data) setPools(res.data.data);
		});
	}, []);

	if (!user) {
		return <h1>Please Sign In</h1>;
	}

	return (
		<div
			className=""
			style={{ minHeight: '100vh', backgroundColor: '#F1EAE8' }}
		>
			<h1
				className="d-flex justify-content-center p-4"
				style={{ backgroundColor: '#F1EAE8' }}
			>
				Profile
			</h1>
			<div className="container">
				<h2>
					<u>{user.username}'s Pools</u>
				</h2>
				<div className="">
					{pools.map((pool) => {
						return (
							<Card
								className={classes.root + 'd-inline-flex'}
								style={{ margin: '0.5rem' }}
							>
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
		</div>
	);
};

export default Profile;
