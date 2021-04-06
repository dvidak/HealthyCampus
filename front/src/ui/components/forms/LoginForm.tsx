import { Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginData } from '../../../models/Auth';
import FormInput from './FormInput';

interface Props {
	login: (data: LoginData) => void;
}

const LoginForm = ({ login }: Props) => {
	const { handleSubmit, register, errors } = useForm();

	const onSubmit = handleSubmit((data: LoginData) => {
		login(data);
	});

	return (
		<form className="form-container" onSubmit={onSubmit} noValidate>
			<h3>Please login</h3>
			<FormInput
				label="Email"
				name="email"
				type="email"
				placeholder="Enter your email"
				registerRef={register({
					required: 'Email is required!',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
						message: 'This is not an email format!',
					},
				})}
				errors={errors.email}
			></FormInput>

			<FormInput
				label="Password"
				name="password"
				type="password"
				placeholder="Enter your password"
				registerRef={register({
					required: 'Password is required!',
				})}
				errors={errors.password}
			></FormInput>

			<div className="container">
				<Button fullWidth type="submit" variant="contained" color="secondary">
					Login
				</Button>
			</div>
		</form>
	);
};

export default LoginForm;
