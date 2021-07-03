export async function createSession(code: string) {
	const res = await fetch('http://localhost:5000/create_session', {
		method: 'post',
		body: JSON.stringify({ code }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const json = await res.json();

	return {
		status: json.status,
		token: json.token,
	};
}
