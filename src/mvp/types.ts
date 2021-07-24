export type Signup = {
	id: string;
	groupId: string | null;
} & (
	| {
			placeId: string;
			latitude: number;
			longitude: number;
	  }
	| {
			placeId: null;
			latitude: null;
			longitude: null;
	  }
);

export type Event = {
	url: string;
	name: string;
	latitude: number;
	longitude: number;
	me: {
		signupId: string;
		name: string;
		driving: boolean;
		carpool: {
			groupId: string;
			members: { signupId: string; name: string; email: string }[];
		} | null;
	};
	signups: Record<string, Signup>;
	carpools: {
		groupId: string;
		driverName: string;
		signupIds: string[];
	}[];
};
