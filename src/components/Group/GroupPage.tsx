import { useParams } from 'react-router';
import Group from './Group';

export default function GroupPage() {
	const { id } = useParams<{ id: string }>();

	return <Group id={+id} />;
}
