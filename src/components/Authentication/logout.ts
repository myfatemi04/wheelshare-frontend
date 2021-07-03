export default function logout() {
	localStorage.removeItem('session_token');
	window.location.href = '/';
}
