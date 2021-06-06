export const postAuth = async (model: unknown, body: unknown) => {
  const response = await fetch(`http://localhost:4000/api/${model}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const get = async (model: unknown) => {
  return fetch(`http://localhost:4000/api/${model}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') as string,
    },
  }).then((response) => response.json());
};

export const put = async (model: unknown, body: unknown) => {
  const response = await fetch(`http://localhost:4000/api/${model}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') as string,
    },
  });

  return response.json();
};

export const post = async (model: unknown, body: unknown) => {
  const response = await fetch(`http://localhost:4000/api/${model}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') as string,
    },
  });

  return response.json();
};

export const remove = async (model: unknown) => {
  const response = await fetch(`http://localhost:4000/api/${model}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') as string,
    },
  });

  return response.json();
};
