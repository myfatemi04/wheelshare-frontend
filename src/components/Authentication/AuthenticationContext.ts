import { createContext } from 'react';

export type User = {
	name: string;
	id: number;
	email?: string;
};

export type AuthenticationContextProps = {
	user: User | null;

	/**
	 * Function that can be used to trigger an auth state refresh.
	 */
	refresh: () => void;
};

const AuthenticationContext = createContext<AuthenticationContextProps>({
	user: null,
	refresh: () =>
		console.warn('calling refresh on default AuthenticationContext'),
});

export default AuthenticationContext;
