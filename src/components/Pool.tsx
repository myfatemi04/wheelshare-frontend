import { useState, useCallback, useRef, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Textarea from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import Comment from './Comment';
import { makeAPIPostCall } from '../api/utils';
import AuthenticationContext from './AuthenticationContext';
import PoolMap from './PoolMap';

// eslint-disable-next-line
const SAMPLE_POOL = {
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
};

export default function Pool({
	pool,
	triggerUpdate,
}: {
	pool: Carpool.Pool;
	triggerUpdate: Function;
}) {
	const { user } = useContext(AuthenticationContext);

	const commentTextareaRef = useRef<HTMLTextAreaElement>(null);
	const [commentStatus, setCommentStatus] = useState<
		null | 'pending' | 'errored'
	>(null);

	const onComment = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
		(e) => {
			e.preventDefault();

			if (!commentTextareaRef.current) {
				// Wait for ref to be ready
				return;
			}

			if (commentTextareaRef.current.value.length === 0) {
				// Noop, no comment to send
				return;
			}

			setCommentStatus('pending');

			makeAPIPostCall('/comment', {
				body: commentTextareaRef.current!.value,
			})
				.then(() => {
					setCommentStatus(null);
					commentTextareaRef.current!.value = '';
				})
				.catch(() => {
					setCommentStatus('errored');
				});
		},
		[]
	);

	const onRegister = useCallback(() => {
		makeAPIPostCall(`/pools/${pool._id}/join`).then(() => triggerUpdate());
	}, [pool._id, triggerUpdate]);

	const onUnregister = useCallback(() => {
		makeAPIPostCall(`/pools/${pool._id}/leave`).then(() => triggerUpdate());
	}, [pool._id, triggerUpdate]);

	return (
		<Card style={{ margin: '3rem auto', padding: '1rem 1rem', width: '50%' }}>
			{pool && (
				<>
					<Typography variant="h2" align="center">
						{pool.title}
					</Typography>
					<Typography variant="subtitle1">
						<b>Capacity</b>: {pool.participant_ids?.length} / {pool.capacity}
					</Typography>
					<Typography variant="subtitle1">
						<b>Start Time</b>: {pool.start_time || '3:00 PM'}
					</Typography>
					<Typography variant="subtitle1">
						<b>End Time</b>: {pool.end_time || '3:30 PM'}
					</Typography>
					<Typography variant="body1">{pool.description}</Typography>
					{user && (
						<Button
							variant="contained"
							color="primary"
							style={{ marginTop: '0.5rem' }}
							onClick={
								pool.participant_ids?.includes(user._id)
									? onUnregister
									: onRegister
							}
						>
							{pool.participant_ids?.includes(user._id)
								? 'Unregister'
								: 'Register'}
						</Button>
					)}
					<hr />
					<PoolMap />
					<hr />
					<Textarea
						cols={80}
						ref={commentTextareaRef}
						placeholder="Post a comment..."
						disabled={commentStatus === 'pending'}
						style={{ margin: '0.5rem 0rem' }}
					/>
					<Button
						variant="contained"
						onClick={onComment}
						style={{ margin: '0.5rem 0rem' }}
						disabled={commentStatus === 'pending'}
					>
						Post Comment
					</Button>
					<Typography variant="subtitle1">
						{commentStatus === 'errored' && 'Error posting comment'}
					</Typography>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						{pool.comments.map((comment) => (
							<Comment comment={comment} key={comment.id} />
						))}
					</div>
				</>
			)}
		</Card>
	);
}
