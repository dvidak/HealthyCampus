import React, { useEffect, useState } from 'react';
import { SignUpData } from '../../models/Auth';
import universityService from '../../services/univeristy';
import authService from '../../services/auth';
import SignUpForm from '../components/forms/SignUpForm';
import { universityGroupOptions } from '../shared/helpers';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

const SignUp = () => {
	const history = useHistory();
	const [token, setToken] = useLocalStorage<string | null>('token', null);
	const [universityOptions, setUniversityOptions] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);

	const signUp = async (data: SignUpData) => {
		const signUpResponse = await authService.signUp(data);
		if (signUpResponse.statusCode === 400) {
			setErrorMessage(signUpResponse.message);
		} else {
			setToken(signUpResponse.token);
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
		if (token) {
			history.push('/home');
		}
	}, [history, token]);

	return (
		<div className="register-page">
			<p className="invalid-login">{errorMessage}</p>
			<SignUpForm signUp={signUp} options={universityOptions}></SignUpForm>
		</div>
	);
};

export default SignUp;
