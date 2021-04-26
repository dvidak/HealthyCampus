import { Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../forms/FormInput';

interface Props {
  createUnit: (data: {}) => void;
}

const UnitForm = ({ createUnit }: Props) => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = handleSubmit((data) => {
    createUnit(data);
  });

  return (
    <form className="form-container" onSubmit={onSubmit} noValidate>
      <h3>Create unit</h3>

      <FormInput
        label="Unit name"
        name="name"
        type="text"
        placeholder="Enter unit name"
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

export default UnitForm;
