export default function getSessionId() {
	return localStorage.getItem('session_token');
}
