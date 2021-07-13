import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Carpool from './Carpool';

export default function CarpoolPage() {
	const id = +useParams<{ id: string }>().id;

	return (
		<>
			<Header />
			<Carpool id={id} />
		</>
	);
}
