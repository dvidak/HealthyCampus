import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpData } from '../../models/Auth';
import authService from '../../services/auth';
import universityService from '../../services/univeristy';
import SignUpForm from '../components/forms/SignUpForm';
import { universityGroupOptions } from '../shared/helpers';

const SignUp = () => {
	const history = useHistory();
	const [universityOptions, setUniversityOptions] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);

	const signUp = async (data: SignUpData) => {
		const signUpResponse = await authService.signUp(data);
		if (signUpResponse.statusCode === 400) {
			setErrorMessage(signUpResponse.message);
		} else {
			localStorage.setItem('token', signUpResponse.token);
		}
	};

	useEffect(() => {
		async function fetchUniveristies() {
			const universities = await universityService.getUniversities();
			setUniversityOptions(universityGroupOptions(universities));
		}

		fetchUniveristies();
	}, []);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			history.push('/home');
		}
	});

	return (
		<div className="register-page">
			<p className="invalid-login">{errorMessage}</p>
			<SignUpForm signUp={signUp} options={universityOptions}></SignUpForm>
		</div>
	);
};

export default SignUp;
