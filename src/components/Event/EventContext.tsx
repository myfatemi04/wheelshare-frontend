import { createContext } from 'react';
import { IEvent } from '../types';

const EventContext = createContext({
	refresh: () => {
		console.error('not implemented: refresh');
	},
	event: null! as IEvent,
	default: true,
});

export default EventContext;
