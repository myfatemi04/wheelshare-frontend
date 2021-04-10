import { useState, useEffect, FormEventHandler, useCallback } from 'react';
import { useParams } from 'react-router';

const Pool = () => {
	const id = useParams<{ id: string }>().id;
	const [state, setState] = useState({
		id: 1,
		pool_title: 'TJ Carpool',
		pool_text: 'Carpool from TJ track to homes',
		start_time: '4/10/2021 3:00 PM',
		end_time: '4/10/2021 4:00 PM',
		capacity: 2,
		participants: [],
		comments: ['What is the covid vaccination status of all the participants?'],
	});
	const [registered, setRegistered] = useState(false);
	const onComment = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_ENDPOINT}/pool/comments`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	}, []);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_ENDPOINT}/pool/${id}`)
			.then((response) => response.json())
			.then((data) => {
				if (data !== undefined) {
					setState(data);
				}
			});
	}, [id]);

	return (
		<div className="bg-dark" style={{ minHeight: '100vh' }}>
			<h1
				style={{ backgroundColor: '#F1EAE8', fontFamily: 'Impact' }}
				className="d-flex justify-content-center p-4"
			>
				Pool {id}
			</h1>
			<div className="container " style={{ fontFamily: 'Courier New' }}>
				<div className="card card-body " style={{ backgroundColor: '#F1EAE8' }}>
					<h1 className="card-title">{state.pool_title}</h1>
					<p className="text-left">
						Capacity: {state.participants.length} / {state.capacity}
					</p>
					<p className="text-left">Start Time: {state.start_time}</p>
					<p className="text-left">End Time: {state.end_time}</p>
					<p className="text-left">{state.pool_text}</p>
					<form
						action={'register_pool/' + id}
						method="POST"
						className="text-left"
					>
						<input
							type="submit"
							value={!registered ? 'Register' : 'Unregister'}
							className={
								'text-left btn btn-' + (!registered ? 'success' : 'danger')
							}
						/>
					</form>
				</div>

				<form onSubmit={onComment}>
					<div id="form-group" className="text-left">
						<textarea
							className="form-control"
							id="comment"
							placeholder="Enter comment here..."
						/>
						<input className="btn btn-primary" type="submit" value="Submit" />
					</div>
					<br />
				</form>
				<div className="text-left">
					<h4 className="text-white">Comments:</h4>
					{state.comments.map((comment) => {
						return (
							<div
								className="card card-body"
								style={{ backgroundColor: '#D6D1D0' }}
							>
								<p className="card-text">{comment}</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Pool;
