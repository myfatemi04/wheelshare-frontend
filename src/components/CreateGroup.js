import React, { useState, useEffect } from 'react';

const CreateGroup = (props) => {
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
							Create Group
						</h1>
						<label className="" for="title">
							Group Title:{' '}
						</label>
						<input
							type="text"
							id="title"
							name="title"
							className="form-control d-flex"
							placeholder="Enter title here..."
						></input>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateGroup;
