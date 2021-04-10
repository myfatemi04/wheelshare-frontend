import React, { useState, useEffect } from 'react';

const UpdatePool = (props) => {
	const id = props.match.params.id;
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

	const callAPI = () => {
		fetch(`${process.env.REACT_APP_API_ENDPOINT}/pool/${id}`)
			.then((response) => response.json())
			.then((data) => {
				if (data !== undefined) {
					setState(data);
				}
			});
	};
	const onSubmit = (e) => {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_API_ENDPOINT}/create_pool`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	};
	useEffect(() => {
		callAPI();
	}, []);
	return (
		<div
			className="bg-dark"
			style={{ minHeight: '100vh', fontFamily: 'Courier New' }}
		>
			<div
				className="container card card-body text-left "
				style={{ backgroundColor: '#F1EAE8' }}
			>
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<h1 className="form-title" style={{ fontFamily: 'Impact' }}>
							Update Pool
						</h1>
						<label className="" for="title">
							Pool Title:{' '}
						</label>
						<input
							type="text"
							id="title"
							name="title"
							className="form-control d-flex"
							placeholder="Enter title here..."
						></input>
					</div>
					<div className="form-group">
						<label className="" for="capacity">
							Pool Capacity:
						</label>
						<input
							type="number"
							id="capacity"
							name="capacity"
							className="form-control d-flex"
							placeholder="5"
						></input>
					</div>
					<div className="form-group">
						<label className="" for="pool_start">
							Start Time:
						</label>
						<input
							type="datetime-local"
							id="pool_start"
							name="pool_start"
							className="form-control"
							placeholder=""
						></input>
					</div>
					<div className="form-group">
						<label className="" for="pool_end">
							End Time:
						</label>
						<input
							type="datetime-local"
							id="pool_end"
							name="pool_end"
							className="form-control"
							placeholder="Enter text here..."
						></input>
					</div>
					<div className="form-group">
						<label className="" for="title">
							Pool Description:
						</label>
						<textarea
							type="text"
							id="Pool-text"
							name="Pool-text"
							style={{ height: '200px' }}
							className="form-control"
							placeholder="Enter text here..."
						></textarea>
					</div>

					<input
						className="btn btn-success text-left"
						type="submit"
						value="Update"
					/>
					<br />
				</form>
			</div>
		</div>
	);
};

export default UpdatePool;
