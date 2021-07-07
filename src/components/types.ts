/**
 * Model User
 */

export type IUser = {
	id: number;
	email: string;
	name: string | null;
};

/**
 * Model Invitation
 */

export type IInvitation = {
	userId: number;
	carpoolId: number;
	isRequest: boolean;
	sentTime: Date;
};

/**
 * Model Carpool
 */

export type ICarpool = {
	id: number;
	name: string;
	description: string;
	eventId: number | null;
	event?: IEvent;
	members: IUser[];
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
	startTime: Date;
	duration: number;
	endTime: Date | null;
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
	placeId: string | null;
	formattedAddress: string | null;
	latitude: number | null;
	longitude: number | null;
};
