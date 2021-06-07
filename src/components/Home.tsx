import Button from '@material-ui/core/Button';
import { useContext } from 'react';
import { ION_AUTHORIZATION_ENDPOINT } from '../api/api';
import AuthenticationContext from './Authentication/AuthenticationContext';

import ChatIcon from '@material-ui/icons/Chat';
import LockIcon from '@material-ui/icons/Lock';
import LocalTaxi from '@material-ui/icons/LocalTaxi';
import RedeemIcon from '@material-ui/icons/Redeem';

export default function Home() {
	const { user, isLoggedIn } = useContext(AuthenticationContext);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '1rem 0rem',
				backgroundImage: "url('images/banner-new.jpg')",
				backgroundRepeat: 'no-repeat',
				color: 'white',
				// backgroundSize: '',
			}}
		>
			<h1 style={{ textShadow: '1px 1px black', fontSize: '8rem' }}>
				WheelShare
			</h1>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					margin: '1rem 0rem',
					fontSize: '2rem',
					backgroundColor: 'rgba(1, 1, 1, 0.5)',
					padding: '0.5rem 1rem',
				}}
			>
				{!isLoggedIn ? (
					<Button
						onClick={() => (window.location.href = ION_AUTHORIZATION_ENDPOINT)}
					>
						Sign in with Ion
					</Button>
				) : (
					'Hello ' + user?.first_name + '!'
				)}
			</div>
			<div className="d-flex flex-column">
				<section id="reinvest" style={{ paddingTop: '80px' }}>
					<div className="container">
						<div className="text-center">
							<img
								id="logo"
								alt="Carpool App"
								onMouseOver={(e) => (e.currentTarget.src = 'images/logo.gif')}
								onMouseOut={(e) => (e.currentTarget.src = 'images/logo.png')}
								className="text-center img-fluid"
								src="images/logo.png"
								width="500px"
								height="750px"
							/>
						</div>
						<h3 className="text-white bg-primary rounded-lg shadow-lg p-3 mb-5 mt-3">
							Helping communities utilize carpooling
						</h3>
					</div>
				</section>
				<section id="about" className="p-4">
					<div
						className="container"
						style={{ backgroundColor: 'rgba(1, 1, 1, 0.5)' }}
					>
						<h1 className="d-flex justify-content-center m-2 p-2">
							<u>About Us</u>
						</h1>
						<p className="d-flex justify-content-center m-2 p-2">
							Wheelshare is an app aimed to help communities find safe ways to
							carpool. The app has groups where people must be approved before
							joining. Upon joining, users can create their own car pool inside
							that communitiy or join others.
						</p>
					</div>
				</section>
				<section id="services" className="">
					<div className="bg-dark text-white p-4">
						<div>
							<h1 className="d-flex justify-content-center m-2 p-4">
								Our Services
							</h1>

							<div className="row exp-grids py-3 d-inline-flex justify-content-center">
								<div className="col-lg-5 col-md-7 bg-white text-dark m-2 p-4">
									<div className="exp wthree">
										<h5>
											<LockIcon style={{ marginRight: '1em' }} />
											Privacy and Security
										</h5>
										<div className="clearfix"></div>
										<p>
											All carpools are private to a community. Nobody can view a
											route before being approved by an admin to the group.
										</p>
									</div>
								</div>
								<div className="col-lg-5 col-md-7 bg-white text-dark m-2 p-4">
									{/* <img src="images/events.jpg" alt=" " className="img-fluid" /> */}
									<div className="exp wthree">
										<h5>
											<LocalTaxi style={{ marginRight: '1em' }} />
											Optimized Routes
										</h5>
										<div className="clearfix" />
										<p>
											We provide maps for every carpool that enable riders and
											drivers to choose the optimal carpools for their routes.
										</p>
									</div>
								</div>
								<div className="col-lg-5 col-md-7 bg-white text-dark m-2 p-4">
									{/* <img src="images/post.jpg" alt=" " className="img-fluid" /> */}
									<div className="exp wthree">
										<h5>
											<ChatIcon style={{ marginRight: '1em' }} />
											Communication
										</h5>
										<div className="clearfix" />
										<p>
											Easily communicate with others in the pool without needing
											to set up an external group chat. For example, you could
											coordinate based on who has been vaccinated and who
											hasn't, and ensure that you are following all COVID safety
											protocols.
										</p>
									</div>
								</div>
								<div className="col-lg-5 col-md-7 bg-white text-dark m-2 p-4">
									{/* <img
										src="images/createpost.jpg"
										alt=""
										className="img-fluid"
									/> */}
									<div className="exp wthree">
										<h5>
											<RedeemIcon style={{ marginRight: '1em' }} />
											Rewards
										</h5>
										<div className="clearfix" />
										<p>
											Every driver is given points based on how many passenger
											miles they have. These points can accumulate and be shown
											as badges on the driver's profile.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
