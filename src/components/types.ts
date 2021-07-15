/**
 * Model User
 */

export type IUser = {
	id: number;
	email: string;
	name: string | null;
};

/**
 * Model Carpool
 */

export type ICarpool = {
	id: number;
	name: string;
	eventId: number | null;
	event: {
		id: number;
		name: string;
		formattedAddress: string;
		latitude: number;
		longitude: number;
		placeId: string;
	};
	// driverId: number | null;
	// driver: {
	// 	id: number;
	// 	name: string;
	// };
	members: {
		id: number;
		name: string;
	}[];
	invitations: {
		user: {
			id: number;
			name: string;
		};
		isRequest: boolean;
	}[];
};

/**
 * Model Group
 */

export type IGroup = {
	id: number;
	name: string;
	events: IEvent[];
};

/**
 * Model Event
 */

export type IEvent = {
	id: number;
	name: string;
	group: {
		id: number;
		name: string;
	};
	carpools: {
		id: number;
		name: string;
		members: {
			id: number;
			name: string;
		}[];
	}[];
	signups: Record<string, IEventSignup>;
	startTime: string; // Datestring
	duration: number;
	endTime: string | null; // Datestring
	daysOfWeek: number;
	placeId: string;
	formattedAddress: string;
	latitude: number;
	longitude: number;
};

/**
 * Model EventSignup
 */

export type IEventSignup = {
	user: {
		id: number;
		name: string;
	};
} & (
	| { placeId: null; formattedAddress: null; latitude: null; longitude: null }
	| {
			placeId: string;
			formattedAddress: string;
			latitude: number;
			longitude: number;
	  }
);

export type IInvitation = {
	user: {
		id: number;
		name: string;
	};
	carpool: {
		id: number;
		name: string;
	};
	sentTime: string;
	isRequest: boolean;
};
