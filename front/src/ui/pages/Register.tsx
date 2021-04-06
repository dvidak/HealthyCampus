import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../components/forms/RegisterForm';

const Register = () => {
	let history = useHistory();
	const isLoggedIn = Boolean(localStorage.getItem('username'));

	useEffect(() => {
		if (isLoggedIn) {
			history.push('/home');
		}
	}, [history, isLoggedIn]);
	return (
		<div className="register-page">
			<RegisterForm></RegisterForm>
		</div>
	);
};

export default Register;
