import { createContext } from 'react';
import { IEvent, IEventSignup } from '../types';

const EventContext = createContext({
	refresh: () => {
		console.error('not implemented: refresh');
	},
	event: null! as IEvent,
	default: true,
	signups: {} as Record<string, IEventSignup>,
	tentativeInvites: {} as Record<number, boolean>,
});

export default EventContext;
