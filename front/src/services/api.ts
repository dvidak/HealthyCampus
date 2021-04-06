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
