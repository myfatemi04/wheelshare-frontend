const domain = process.env.REACT_APP_API_DOMAIN;

console.log({ domain });

export async function createSession(code: string, redirectUrl: string) {
	const res = await fetch(domain + 'create_session', {
		method: 'post',
		body: JSON.stringify({ code, redirectUrl }),
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
