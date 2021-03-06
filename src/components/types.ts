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
	note: string;
	eventId: number | null;
	event: {
		id: number;
		name: string;
		formattedAddress: string;
		latitude: number;
		longitude: number;
		placeId: string;
		startTime: string | null;
		endTime: string | null;
		duration: number;
	};
	creatorId: number;
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
	users: {
		id: number;
		name: string;
	}[];
	admins: {
		id: number;
		name: string;
	}[];
	joinCode: string | null;
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
	} | null;
	creator: {
		id: number;
		name: string;
	};
	carpools: {
		id: number;
		name: string;
		note: string;
		members: {
			id: number;
			name: string;
		}[];
	}[];
	description: string;
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

export type IEventSignupBase = {
	user: {
		id: number;
		name: string;
		bio: string;
	};
	canDrive: boolean;
	note: string;
};

export type IEventSignupWithLocation = IEventSignupBase & {
	placeId: string;
	formattedAddress: string;
	latitude: number;
	longitude: number;
};

export type IEventSignupWithoutLocation = IEventSignupBase & {
	placeId: null;
	formattedAddress: null;
	latitude: null;
	longitude: null;
};

/**
 * Model EventSignup
 */

export type IEventSignup =
	| IEventSignupWithLocation
	| IEventSignupWithoutLocation;

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
