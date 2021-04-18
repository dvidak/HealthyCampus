import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { LoginData } from '../../models/Auth';
import authService from '../../services/auth';
import LoginForm from '../components/forms/LoginForm';

const Login = () => {
	const history = useHistory();
	const [errorMessage, setErrorMessage] = useState(null);

	const login = async (data: LoginData) => {
		const loginResponse = await authService.login(data);
		if (loginResponse.statusCode === 400) {
			setErrorMessage(loginResponse.message);
		} else {
			localStorage.setItem('token', loginResponse.token);
			localStorage.setItem('userId', loginResponse.user.id);
			localStorage.setItem('role', loginResponse.user.role.roleName);

			history.push('/profile');
		}
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			history.push('/home');
		}
	});

	return (
		<div className="login-page">
			<p className="invalid-login">{errorMessage}</p>
			<LoginForm login={login}></LoginForm>
		</div>
	);
};

export default Login;
