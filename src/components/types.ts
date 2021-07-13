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
	invitations: IInvitation[];
};

/**
 * Model Group
 */

export type IGroup = {
	id: number;
	name: string;
};

/**
 * Model Event
 */

export type IEvent = {
	id: number;
	name: string;
	groupId: number;
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
		};
	}[];
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
	eventId: number;
	userId: number;
	user: {
		id: number;
		name: string;
	};
	placeId: string | null;
	formattedAddress: string | null;
	latitude: number | null;
	longitude: number | null;
};

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
