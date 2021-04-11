declare namespace Carpool {
	export interface Group {
		_id: string;
		name: string;
		member_ids: string[];
		creator_id: string;
	}

	// Omits the email attribute
	export interface PublicUser {
		_id: string;
		username: string;
		first_name: string;
		last_name: string;
	}

	export interface User {
		_id: string;
		email: string;
		username: string;
		first_name: string;
		last_name: string;
	}

	export interface Comment {
		id: string;
		body: string;
		author_id: string;
	}

	export type Status = 'pending' | 'cancelled' | 'completed' | 'interrupted';

	export interface Pool {
		_id: string;
		title: string;
		description: string;
		participant_ids: string[];
		driver_id: string;
		create_time: string;
		update_time: string;
		comments: Comment[];
		group_id: string;
		status: Status;
		capacity: number;
		direction: 'pickup' | 'dropoff';
		author_id: string;
		type: 'request' | 'offer';
		start_time: string;
		end_time: string;
	}
}
