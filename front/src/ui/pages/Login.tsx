import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocalStorage } from 'react-use';
import { LoginData } from '../../models/Auth';
import authService from '../../services/auth';
import LoginForm from '../components/forms/LoginForm';

const Login = () => {
	const history = useHistory();
	const [token, setToken] = useLocalStorage<string | null>('token', null);
	const [errorMessage, setErrorMessage] = useState(null);

	const login = async (data: LoginData) => {
		const loginResponse = await authService.login(data);
		if (loginResponse.statusCode === 400) {
			setErrorMessage(loginResponse.message);
		} else {
			setToken(loginResponse.token);
		}
	};

	useEffect(() => {
		if (token) {
			history.push('/home');
		}
	}, [history, token]);

	return (
		<div className="login-page">
			<p className="invalid-login">{errorMessage}</p>
			<LoginForm login={login}></LoginForm>
		</div>
	);
};

export default Login;
