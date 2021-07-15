import { useParams } from 'react-router-dom';
import Carpool from './Carpool';

export default function CarpoolPage() {
	const id = +useParams<{ id: string }>().id;

	return <Carpool id={id} />;
}
