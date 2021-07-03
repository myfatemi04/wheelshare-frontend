export function post(path: string, data: any) {
	return fetch('http://localhost:5000/api' + path, {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export function delete$(path: string, data: any) {
	return fetch('http://localhost:5000/api' + path, {
		method: 'delete',
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
