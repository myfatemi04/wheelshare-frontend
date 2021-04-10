import AppBar from '@material-ui/core/AppBar';

const Nav = () => {
	return (
		<AppBar className="navbar navbar-expand-lg navbar-dark bg-dark">
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNavDropdown">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<a className="nav-link text-white" href="/">
							Carpool <span className="sr-only">(current)</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link text-white" href="/profile">
							Profile <span className="sr-only">(current)</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link text-white" href="/groups">
							Groups
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link text-white" href="/mygroups">
							MyGroups
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link text-white" href="/mypools">
							MyPools
						</a>
					</li>
				</ul>
			</div>
		</AppBar>
	);
};

export default Nav;
