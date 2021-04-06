import { LoginData } from '../models/Auth';
import { postAuth } from './api';

const login = async (data: LoginData) => {
	const response = await postAuth('auth/login', data);

	if (response.token) {
		localStorage.setItem('token', response.token);
		localStorage.setItem('id', response.user.id);
		let str = response.user.email;
		localStorage.setItem('username', str.substring(0, str.lastIndexOf('@')));
	}
	return response;
};

const authService = {
	login,
};

export default authService;
