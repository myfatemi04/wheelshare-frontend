import React from 'react';

const Nav = (props) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
						<a className="nav-link text-white" href="/pools">
							Pools
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
