import { createContext } from 'react';

export type AuthState = {
	isLoggedIn: boolean | null;
	user: Carpool.User | null;

	/**
	 * Function that can be used to trigger an auth state refresh.
	 */
	refreshAuthState: (() => void) | null;
};

const Authentication = createContext<AuthState>({
	isLoggedIn: false,
	user: null,
	refreshAuthState: null,
});

export default Authentication;
