import { Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './FormInput';

interface Props {
  createUniversity: (data: {}) => void;
}

const UniversityForm = ({ createUniversity }: Props) => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = handleSubmit((data) => {
    createUniversity(data);
  });

  return (
    <form className="form-container" onSubmit={onSubmit} noValidate>
      <h3>Create university</h3>

      <FormInput
        label="University name"
        name="name"
        type="text"
        placeholder="Enter university name"
        registerRef={register({
          required: 'Name is required!',
          pattern: {
            value: /^[a-zA-Z0-9_ ]*$/,
            message: 'Invalid name',
          },
        })}
        errors={errors.name}
      ></FormInput>

      <div className="container">
        <Button fullWidth type="submit" variant="contained" color="secondary">
          Create
        </Button>
      </div>
    </form>
  );
};

export default UniversityForm;
