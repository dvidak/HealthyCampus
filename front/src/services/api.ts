export async function postAuth(model: unknown, body: unknown) {
	const response = await fetch(`http://localhost:4000/api/${model}`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});

	return response.json();
}

export function get(model: unknown) {
	return fetch(`http://localhost:4000/api/${model}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: localStorage.getItem('token') as string,
		},
	}).then((response) => response.json());
}

export async function put(model: unknown, body: unknown) {
	const response = await fetch(`http://localhost:4000/api/${model}`, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});

	return response.json();
}
