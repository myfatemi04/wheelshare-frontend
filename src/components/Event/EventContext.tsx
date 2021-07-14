import { createContext } from 'react';
import { IEvent, IEventSignup } from '../types';
import * as immutable from 'immutable';

const EventContext = createContext({
	refresh: () => {
		console.error('not implemented: refresh');
	},
	event: null! as IEvent,
	default: true,
	signups: null as IEventSignup[] | null,
	addTentativeInvite: (id: number) => {
		console.error('not implemented: addTentativeInvite');
	},
	removeTentativeInvite: (id: number) => {
		console.error('not implemented: removeTentativeInvite');
	},
	tentativeInvites: immutable.Set<number>(),
	hasCarpool: false,
	setHasCarpool: (has: boolean) => {
		console.error('not implemented: setHasCarpool');
	},
});

export default EventContext;
