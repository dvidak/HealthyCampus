import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginData } from '../../models/Auth';
import authService from '../../services/auth';
import LoginForm from '../components/forms/LoginForm';

const Login = () => {
	let history = useHistory();
	const isLoggedIn = Boolean(localStorage.getItem('username'));
	const [errorMessage, setErrorMessage] = useState(null);

	const login = async (data: LoginData) => {
		const loginData = await authService.login(data);
		if (loginData.statusCode === 400) {
			setErrorMessage(loginData.message);
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			history.push('/home');
		}
	}, [history, isLoggedIn]);

	return (
		<div className="login-page">
			<p className="invalid-login">{errorMessage}</p>
			<LoginForm login={login}></LoginForm>
		</div>
	);
};

export default Login;
