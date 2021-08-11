const KEY = 'ws_login_continue_url';

export function setLoginContinueURL(url: string) {
	localStorage.setItem(KEY, url);
}

export function hasLoginContinueURL() {
	return localStorage.getItem(KEY) !== null;
}

export function popLoginContinueURL() {
	const value = localStorage.getItem(KEY);

	localStorage.removeItem(KEY);

	return value;
}
