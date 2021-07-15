import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Event from './Event';

export default function EventPage() {
	const id = +useParams<{ id: string }>().id;

	return (
		<>
			<Header />
			<Event id={id} />
		</>
	);
}
