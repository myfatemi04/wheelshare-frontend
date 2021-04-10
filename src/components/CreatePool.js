import React, { useState, useEffect } from 'react';

const CreatePool = (props) => {
	const onSubmit = (e) => {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_ENDPOINT}/createPool`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	};
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
						value="Submit"
					/>
					<br />
				</form>
			</div>
		</div>
	);
};

export default CreatePool;
