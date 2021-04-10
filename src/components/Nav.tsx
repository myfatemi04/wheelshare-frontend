import { AppBar, Toolbar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
	navbarDisplayFlex: {
		display: `flex`,
		justifyContent: `space-between`,
	},
	navDisplayFlex: {
		display: `flex`,
		justifyContent: `space-between`,
	},
	linkText: {
		textDecoration: `none`,
		textTransform: `uppercase`,
		color: `white`,
	},
});
const navLinks = [
	{ title: `Profile`, path: `/profile` },
	{ title: `Groups`, path: `/groups` },
	{ title: `MyGroups`, path: `/mygroups` },
	{ title: `MyPools`, path: `/mypools` },
];
const Nav = () => {
	const classes = useStyles();
	return (
		<AppBar position="static" style={{ background: '#40E0D0' }}>
			<Toolbar>
				<Container maxWidth="xl" className={classes.navbarDisplayFlex}>
					<IconButton href="/" edge="start" color="inherit" aria-label="home">
						<Home fontSize="large" />
					</IconButton>
					<List
						component="nav"
						aria-labelledby="main navigation"
						className={classes.navbarDisplayFlex} // this
					>
						{navLinks.map(({ title, path }) => (
							<a href={path} key={title} className={classes.linkText}>
								<ListItem button>
									<ListItemText primary={title} />
								</ListItem>
							</a>
						))}
					</List>
				</Container>
			</Toolbar>
		</AppBar>

		// <AppBar className="navbar navbar-expand-lg navbar-dark bg-dark">
		// 	<button
		// 		className="navbar-toggler"
		// 		type="button"
		// 		data-toggle="collapse"
		// 		data-target="#navbarNavDropdown"
		// 		aria-controls="navbarNavDropdown"
		// 		aria-expanded="false"
		// 		aria-label="Toggle navigation"
		// 	>
		// 		<span className="navbar-toggler-icon"></span>
		// 	</button>
		// 	<div className="collapse navbar-collapse" id="navbarNavDropdown">
		// 		<ul className="navbar-nav mr-auto">
		// 			<li className="nav-item">
		// 				<a className="nav-link text-white" href="/">
		// 					Carpool <span className="sr-only">(current)</span>
		// 				</a>
		// 			</li>
		// 			<li className="nav-item">
		// 				<a className="nav-link text-white" href="/profile">
		// 					Profile <span className="sr-only">(current)</span>
		// 				</a>
		// 			</li>
		// 			<li className="nav-item">
		// 				<a className="nav-link text-white" href="/groups">
		// 					Groups
		// 				</a>
		// 			</li>
		// 			<li className="nav-item">
		// 				<a className="nav-link text-white" href="/mygroups">
		// 					MyGroups
		// 				</a>
		// 			</li>
		// 			<li className="nav-item">
		// 				<a className="nav-link text-white" href="/mypools">
		// 					MyPools
		// 				</a>
		// 			</li>
		// 		</ul>
		// 	</div>
		// </AppBar>
	);
};

export default Nav;
