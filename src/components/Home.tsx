import Button from '@material-ui/core/Button';
import { useContext } from 'react';
import { ION_AUTHORIZATION_ENDPOINT } from '../api/api';
import AuthenticationContext from './AuthenticationContext';

export default function Home() {
	const { user, isLoggedIn } = useContext(AuthenticationContext);
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<h1>Home</h1>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				{!isLoggedIn ? (
					<Button
						onClick={() => (window.location.href = ION_AUTHORIZATION_ENDPOINT)}
					>
						Sign In with Ion
					</Button>
				) : (
					'Hello ' + user?.first_name + '!'
				)}
			</div>
			<div className="d-flex flex-column">
				<section
					id="reinvest"
					style={{
						backgroundImage: "url('images/banner.jpg')",
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						height: '690px',
						paddingTop: '80px',
					}}
				>
					<div className="container">
						<br />
						<div className="text-center">
							<img
								className="text-center img-fluid"
								src="images/logo.png"
								width="350px"
							/>
						</div>
						<br />
						<br />
						<br />
						<h3 className="text-white bg-primary rounded-lg shadow-lg p-3 mb-5">
							Helping communities utilize carpooling
						</h3>
					</div>
				</section>
				<section id="about" className="p-4">
					<div className="container">
						<h1 className="d-flex justify-content-center m-2 p-2">
							<u>About Us</u>
						</h1>
						<p className="d-flex justify-content-center m-2 p-2">
							NAME is an app aimed to help communities find safe ways to
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
									<img src="images/posts.jpg" alt=" " className="img-fluid" />
									<div className="exp wthree">
										<h5>Browse Posts</h5>
										<div className="clearfix"></div>
										<p>
											Easily browse through NLP generated recommended posts in
											your feed. These posts match your previous interests and
											recent trending political and social subjects.
										</p>
									</div>
								</div>
								<div className="col-lg-5 col-md-7 bg-white text-dark m-2 p-4">
									<img src="images/events.jpg" alt=" " className="img-fluid" />
									<div className="exp wthree">
										<h5>Browse Events</h5>
										<div className="clearfix"></div>

										<p>
											Browse local community political events that match your
											political interests in order to best advocate your
											concerns and have your voice heard.
										</p>
									</div>
								</div>
								<div className="col-lg-5 col-md-7 bg-white text-dark m-2 p-4">
									<br />
									<br />
									<br />
									<img src="images/post.jpg" alt=" " className="img-fluid" />
									<div className="exp wthree">
										<br />
										<br />
										<br />

										<h5>Discussion Thread</h5>
										<div className="clearfix"></div>

										<p>
											View someone's post and leave a like or comment to further
											discuss the thread or show your support. Each like or
											comment will make your feed give more posts or events that
											are similar.
										</p>
									</div>
								</div>
								<div className="col-lg-5 col-md-7 bg-white text-dark m-2 p-4">
									<br />
									<br />
									<br />
									<img
										src="images/createpost.jpg"
										alt=" "
										className="img-fluid"
									/>
									<div className="exp wthree">
										<br />
										<br />
										<br />

										<h5>Create Posts</h5>
										<div className="clearfix"></div>

										<p>
											Create your own post anonymously for free and easily. Your
											post will be seen by many others as well as politicians
											that can possibly advocate and recognize your interests
											for your given enough support.
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
