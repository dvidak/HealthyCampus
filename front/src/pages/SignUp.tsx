import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  InputLabel,
  Link,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { SignUpData } from '../models/Auth';
import authService from '../services/auth';
import universityService from '../services/univeristy';
import { universityGroupOptions } from '../shared/helpers';

const Register = () => {
  const navigate = useNavigate();
  const [universityOptions, setUniversityOptions] = useState<any>();

  useEffect(() => {
    async function fetchUniveristies() {
      const universities = await universityService.getUniversities();
      setUniversityOptions(universityGroupOptions(universities));
    }

    fetchUniveristies();
  }, []);

  const handleSignUp = async (data: SignUpData) => {
    const parsedData = {
      ...data,
      unitId: Number(data.unitId),
    };
    const signUpResponse = await authService.signUp(parsedData);
    if (signUpResponse.statusCode === 400) {
    } else {
      localStorage.setItem('token', signUpResponse.token);
      localStorage.setItem('userId', signUpResponse.user.id);
      navigate('/app/home', { replace: true });
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              policy: false,
              unitId: 0,
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              firstName: Yup.string()
                .max(255)
                .required('First name is required'),
              lastName: Yup.string().max(255).required('Last name is required'),
              password: Yup.string().max(255).required('Password is required'),
              policy: Yup.boolean().oneOf([true], 'This field must be checked'),
              unitId: Yup.number().required('Unit is required'),
            })}
            onSubmit={handleSignUp}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />

                <InputLabel htmlFor="unitId">Unit</InputLabel>
                <Select
                  id="unitId"
                  error={Boolean(touched.unitId && errors.unitId)}
                  fullWidth
                  native
                  defaultValue={values.unitId}
                  onChange={handleChange}
                >
                  {universityOptions &&
                    Object.keys(universityOptions).map((groupLabel) => (
                      <optgroup label={groupLabel}>
                        {Object.entries(universityOptions[groupLabel]).map(
                          (option: any) => (
                            <option value={option[0]}>{option[1]}</option>
                          ),
                        )}
                      </optgroup>
                    ))}
                </Select>

                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1,
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{' '}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
