import React, {
	useState,
	useEffect,
	useCallback,
	FormEventHandler,
} from 'react';
import { useParams } from 'react-router-dom';
import { makeAPIGetCall } from '../api/utils';

const UpdatePool = () => {
	const id = useParams<{ id: string }>().id;

	// eslint-disable-next-line
	const [pool, setPool] = useState({
		id: 1,
		pool_title: 'TJ Carpool',
		pool_text: 'Carpool from TJ track to homes',
		start_time: '4/10/2021 3:00 PM',
		end_time: '4/10/2021 4:00 PM',
		capacity: 2,
		participants: [],
		comments: ['What is the covid vaccination status of all the participants?'],
	});

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		makeAPIGetCall('/update_pool').then((res) => {
			console.log(res);
		});
	};
	useEffect(() => {
		makeAPIGetCall('/pool', { poolID: id }).then((res) => {
			if (res.data.data) setPool(res.data.data);
		});
	}, [id]);
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
						<label className="" htmlFor="title">
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
						<label className="" htmlFor="capacity">
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
						<label className="" htmlFor="pool_start">
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
						<label className="" htmlFor="pool_end">
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
						<label className="" htmlFor="title">
							Pool Description:
						</label>
						<textarea
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
