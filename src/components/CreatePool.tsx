import { FormEventHandler } from 'react';
import { makeAPIPostCall } from '../api/utils';
import React, { useState, useEffect } from 'react';

const CreatePool = () => {
	const [title, setTitle] = useState('No Title');
	const [capacity, setCapacity] = useState(0);
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const [direction, setDirection] = useState('pickup');
	const [type, setType] = useState('offer');
	const [description, setDescription] = useState('');

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_ENDPOINT}/createPool`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	};
	const onClick = () => {
		console.log({
			title: title,
			description: description,
			start_time: start,
			end_time: end,
			capacity,
			direction,
			type,
		});
		makeAPIPostCall('/pool', {
			title: title,
			description: description,
			start_time: start,
			end_time: end,
			capacity,
			direction,
			type,
		});
	};
	useEffect(() => {}, []);
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
							Create Pool
						</h1>
						<label className="" htmlFor="title">
							Pool Title:{' '}
						</label>
						<input
							type="text"
							id="title"
							name="title"
							className="form-control d-flex"
							placeholder="Enter title here..."
							onChange={(event) => setTitle(event.target.value)}
						></input>
					</div>
					<div className="form-group">
						<label className="" htmlFor="capacity">
							Pool Capacity:
						</label>
						<input
							type="number"
							id="capacity"
							name="capacity"
							className="form-control d-flex"
							placeholder="0"
							onChange={(event) => setCapacity(parseInt(event.target.value))}
						></input>
					</div>
					<div className="form-group">
						<label className="" htmlFor="pool_start">
							Start Time:
						</label>
						<input
							type="datetime-local"
							id="pool_start"
							name="pool_start"
							className="form-control"
							placeholder=""
							onChange={(event) => setStart(event.target.value)}
						></input>
					</div>
					<div className="form-group">
						<label className="" htmlFor="pool_end">
							End Time:
						</label>
						<input
							type="datetime-local"
							id="pool_end"
							name="pool_end"
							className="form-control"
							placeholder="Enter text here..."
							onChange={(event) => setEnd(event.target.value)}
						></input>
					</div>
					<div className="form-group">
						<label className="" htmlFor="pool_direction">
							Direction:
						</label>
						<select
							id="direction"
							name="direction"
							onChange={(event) => setDirection(event.target.value)}
						>
							<option value="pickup">Picking Up</option>
							<option value="dropoff">Dropping Off</option>
						</select>
					</div>
					<div className="form-group">
						<label className="" htmlFor="pool_type">
							Type:
						</label>
						<select
							id="type"
							name="type"
							onChange={(event) => setType(event.target.value)}
						>
							<option value="offer">Offering carpool</option>
							<option value="request">Requesting carpooll</option>
						</select>
					</div>
					<div className="form-group">
						<label className="" htmlFor="title">
							Pool Description:
						</label>
						<textarea
							onChange={(event) => setDescription(event.target.value)}
							id="Pool-text"
							name="Pool-text"
							style={{ height: '200px' }}
							className="form-control"
							placeholder="Enter text here..."
						/>
					</div>

					<button className="btn btn-success text-left" onClick={onClick}>
						Submit
					</button>
					<br />
				</form>
			</div>
		</div>
	);
};

export default CreatePool;
