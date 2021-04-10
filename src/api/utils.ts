import axios, { AxiosResponse } from 'axios';
import getSessionId from '../lib/getSessionId';
import { APIError } from './error';

export function createUrlWithGetParameters(
	url: string,
	params?: Record<string, string | undefined>
) {
	if (params) {
		// Stringify the parameters
		let stringifiedParameters = '';
		for (let [name, value] of Object.entries(params)) {
			if (value) {
				stringifiedParameters +=
					encodeURIComponent(name) + '=' + encodeURIComponent(value);
			}
		}
		if (stringifiedParameters) {
			url += '?' + stringifiedParameters;
		}
	}
	return url;
}

export function graphql(query: string, variables?: any) {
	return new Promise<AxiosResponse>((resolve, reject) => {
		axios
			.post(
				'/graphql',
				{ query, variables },
				{ headers: { Authorization: 'Bearer ' + getSessionId() } }
			)
			.then((successfulResponse) => {
				resolve(successfulResponse.data.data);
			})
			.catch((error) => {
				if (error.response.status === 401) {
					localStorage.removeItem('session_id');
					window.location.pathname = '/';
				} else {
					reject(new APIError('/api/users/@me', error.response.data.error));
				}
			});
	});
}

export function makeAPIPostCall(url: string, data?: any) {
	return new Promise<AxiosResponse>((resolve, reject) => {
		axios
			.post(url, data, {
				headers: { Authorization: 'Bearer ' + getSessionId() },
			})
			.then((successfulResponse) => resolve(successfulResponse))
			.catch((error) => {
				if (error.response?.status === 401) {
					localStorage.removeItem('session_id');
					window.location.pathname = '/';
				} else {
					reject(new APIError(url, error.response?.data?.error));
				}
			});
	});
}

export function makeAPIGetCall(
	url: string,
	params?: Record<string, string | undefined>
) {
	url = createUrlWithGetParameters(url, params);
	return new Promise<AxiosResponse>((resolve, reject) => {
		axios
			.get(url, {
				headers: { Authorization: 'Bearer ' + getSessionId() },
			})
			.then((successfulResponse) => resolve(successfulResponse))
			.catch((error) => {
				if (error.response?.status === 401) {
					localStorage.removeItem('session_id');
					window.location.pathname = '/';
				} else {
					reject(error);
				}
			});
	});
}

export function makeAPIDeleteCall(url: string) {
	return new Promise<AxiosResponse>((resolve, reject) => {
		axios
			.delete(url, {
				headers: { Authorization: 'Bearer ' + getSessionId() },
			})
			.then((successfulResponse) => resolve(successfulResponse))
			.catch((error) => {
				if (error.response?.status === 401) {
					localStorage.removeItem('session_id');
				} else {
					reject(new APIError(url, error.response.data.error));
				}
			});
	});
}
