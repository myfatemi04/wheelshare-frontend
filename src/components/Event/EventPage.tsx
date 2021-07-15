import { useParams } from 'react-router-dom';
import Event from './Event';

export default function EventPage() {
	const id = +useParams<{ id: string }>().id;

	return <Event id={id} />;
}
