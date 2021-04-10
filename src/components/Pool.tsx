import { useState, useEffect, FormEventHandler, useCallback } from 'react';
import { useParams } from 'react-router';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Textarea from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import Comment from './Comment';

export default function Pool({ registered = false }: { registered?: boolean }) {
	const id = useParams<{ id: string }>().id;
	const [pool, setPool] = useState<Carpool.Pool>({
		id: '123',
		title: 'TJ Carpool',
		description: 'Carpool from TJ track to homes',
		start_time: '4/10/2021 3:00 PM',
		end_time: '4/10/2021 4:00 PM',
		capacity: 2,
		participant_ids: [],
		comments: [
			{
				author_id: 'myfatemi04',
				id: '1234',
				body: "what's the vaccination status of everyone?",
			},
		],
		driver_id: 'None',
		create_time: '1234',
		update_time: '1234',
		group_id: 'tj',
		status: 'pending',
		direction: 'dropoff',
		author_id: 'michael',
		type: 'offer',
	});
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
					setPool(data);
				}
			});
	}, [id]);

	return (
		<Card style={{ margin: '3rem auto', padding: '1rem 1rem', width: '50%' }}>
			<Typography variant="h2" align="center">
				{pool.title}
			</Typography>
			<Typography variant="subtitle1">
				<b>Capacity</b>: {pool.participant_ids.length} / {pool.capacity}
			</Typography>
			<Typography variant="subtitle1">
				<b>Start Time</b>: {pool.start_time}
			</Typography>
			<Typography variant="subtitle1">
				<b>End Time</b>: {pool.end_time}
			</Typography>
			<Typography variant="body1">{pool.description}</Typography>
			<Button
				variant="contained"
				color="primary"
				style={{ marginTop: '0.5rem' }}
			>
				{registered ? 'Unregister' : 'Register'}
			</Button>
			<hr />
			<Textarea
				cols={80}
				placeholder="Post a comment..."
				style={{ margin: '0.5rem 0rem' }}
			/>
			<Button variant="contained">Post Comment</Button>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{pool.comments.map((comment) => (
					<Comment comment={comment} key={comment.id} />
				))}
			</div>
		</Card>
	);
}
