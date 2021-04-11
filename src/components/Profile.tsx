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
	const { user } = useContext(AuthenticationContext);
	const [groups, setGroups] = useState<Carpool.Group[]>([]);
	const [pools, setPools] = useState<Carpool.Pool[]>([]);
	const classes = useStyles();

	useEffect(() => {
		makeAPIGetCall('/users/@me/pools').then((res) => {
			if (res.data.data) setPools(res.data.data);
		});

		makeAPIGetCall('/users/@me/groups').then((res) => {
			if (res.data.data) setGroups(res.data.data);
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
					<u>My Pools (private)</u>
				</h2>
				<div>
					{pools.map((pool) => {
						return (
							<Card
								className={classes.root + 'd-inline-flex'}
								style={{ margin: '0.5rem' }}
							>
								<CardActionArea href={'/pools/' + pool._id}>
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
											let link: string = 'localhost:3000/pools/' + pool._id;
											navigator.clipboard.writeText(link);
										}}
									>
										Share
									</Button>
									<Button
										href={'/pools/' + pool._id}
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

				<h2>
					<u>My Groups (private)</u>
					<div>
						{groups.map((group) => {
							return (
								<Card
									key={group._id}
									style={{ padding: '0.5rem', margin: '0.5rem' }}
								>
									<h1>
										<a href={'/groups/' + group._id}>{group.name}</a>
									</h1>
								</Card>
							);
						})}
					</div>
				</h2>
			</div>
		</div>
	);
};

export default Profile;
