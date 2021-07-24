import { createContext } from 'react';
import { Event } from './types';

const WheelShareContext = createContext({
	event: null as Event | null,
	authenticated: false,
	api: {
		/** Returns token */
		async signup(email: string, password: string, name: string): Promise<void> {
			throw new Error('Method not implemented.');
		},
		/** Returns token */
		async signin(email: string, password: string): Promise<void> {
			throw new Error('Method not implemented.');
		},
		async setDriving(driving: boolean): Promise<void> {
			throw new Error('Method not implemented.');
		},
		async joinEvent(placeId: string | null): Promise<void> {
			throw new Error('Method not implemented.');
		},
		async createEvent(
			name: string,
			startTime: Date,
			endTime: Date,
			moderatorCode: string,
			placeId: string
		): Promise<{ eventId: string }> {
			throw new Error('Method not implemented.');
		},
	},
});

export default WheelShareContext;
