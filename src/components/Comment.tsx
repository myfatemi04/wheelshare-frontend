import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

export default function Comment({ comment }: { comment: Carpool.Comment }) {
	return (
		<Card style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
			<Typography variant="subtitle2">
				<b>Comment by {comment.author_id}</b>
			</Typography>
			<Typography variant="body2">{comment.body}</Typography>
		</Card>
	);
}
