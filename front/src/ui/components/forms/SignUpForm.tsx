import { Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SignUpData } from '../../../models/Auth';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

interface Props {
	signUp: (data: SignUpData) => void;
	options: Record<string, Record<number, string>>;
}

const SignUpForm = ({ signUp, options }: Props) => {
	const { handleSubmit, register, errors } = useForm();

	const onSubmit = handleSubmit((data) => {
		signUp(data as SignUpData);
	});

	return (
		<form className="form-container" onSubmit={onSubmit} noValidate>
			<h3>Please sign up</h3>
			<FormInput
				label="First name"
				name="firstName"
				type="text"
				placeholder="Enter your first name"
				registerRef={register({
					required: 'First name is required!',
					pattern: {
						value: /^[A-Za-z]+$/,
						message: 'This is not valid name!',
					},
				})}
				errors={errors.firstName}
			></FormInput>

			<FormInput
				label="Last name"
				name="lastName"
				type="text"
				placeholder="Enter your last name"
				registerRef={register({
					required: 'Last name is required!',
					pattern: {
						value: /^[A-Za-z]+$/,
						message: 'This is not valid last name!',
					},
				})}
				errors={errors.lastName}
			></FormInput>
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

			<FormSelect
				label="Unit"
				name="unitId"
				options={options}
				registerRef={register({
					required: 'Unit is required!',
				})}
			/>

			<div className="container">
				<Button fullWidth type="submit" variant="contained" color="secondary">
					Sign up
				</Button>
			</div>
		</form>
	);
};

export default SignUpForm;
