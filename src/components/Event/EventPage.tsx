import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent } from '../api';
import Header from '../Header/Header';
import { IEvent } from '../types';
import Event from './Event';

export default function EventPage() {
	const id = +useParams<{ id: string }>().id;
	const [event, setEvent] = useState<IEvent | null>(null);

	useEffect(() => {
		getEvent(id).then(setEvent);
	}, [id]);

	return (
		<>
			<Header />
			{event ? <Event event={event} /> : <span>Loading...</span>}
		</>
	);
}
