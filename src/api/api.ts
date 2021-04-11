import axios from 'axios';
import { APIError } from './error';
import { makeAPIGetCall } from './utils';

// eslint-disable-next-line
const dev = process.env.NODE_ENV === 'development';
export const API_ENDPOINT = 'http://localhost:5000/api';
export const ION_AUTHORIZATION_ENDPOINT = dev
	? 'https://ion.tjhsst.edu/oauth/authorize?response_type=code&client_id=rNa6n9YSg8ftINdyVPpUsaMuxNbHLo9dh1OsOktR&scope=read&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fion%2Fcallback'
	: 'https://ion.tjhsst.edu/oauth/authorize?response_type=code&client_id=rNa6n9YSg8ftINdyVPpUsaMuxNbHLo9dh1OsOktR&scope=read&redirect_uri=https%3A%2F%2Fwheelshare.space%2Fauth%2Fion%2Fcallback';

axios.defaults.baseURL = API_ENDPOINT;

/**
 *
 * @param code The code sent by the OAuth provider
 * @param provider The provider that send the OAuth code
 */
export async function createSession(
	code: string,
	provider: string
): Promise<string> {
	const response = await axios.post('/auth/create_session', {
		code,
		provider,
	});

	if (response.status === 200) {
		return response.data.session_id;
	} else {
		throw new APIError('/auth/create_session', response.data.error);
	}
}

export async function getMe(): Promise<Carpool.User> {
	let result = await makeAPIGetCall('/users/@me');
	return result.data.data;
}

export async function getPublicUser(id: string): Promise<Carpool.PublicUser> {
	let result = await makeAPIGetCall(`/users/${id}`);
	return result.data.data;
}
