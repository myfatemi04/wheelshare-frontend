import { Redirect } from 'react-router';

export default function Logout() {
	localStorage.removeItem('session_token');

	return <Redirect to="/"></Redirect>;
}
