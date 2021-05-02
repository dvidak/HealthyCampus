import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { UserUpdateData } from '../models/User';
import universityService from '../services/univeristy';
import { universityGroupOptions } from '../shared/helpers';
import userService from '../services/user';

interface Props {
  user: UserUpdateData;
}

const UserProfileDetails = ({ user }: Props) => {
  const [universityOptions, setUniversityOptions] = useState<any>();

  useEffect(() => {
    async function fetchUniveristies() {
      const universities = await universityService.getUniversities();
      setUniversityOptions(universityGroupOptions(universities));
    }

    fetchUniveristies();
  }, []);

  const handleUpdateUser = async (data: UserUpdateData) => {
    await userService.updateUser(data);
  };

  return (
    <Formik onSubmit={handleUpdateUser} initialValues={user}>
      {({ handleChange, handleSubmit, isSubmitting, values }: any) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="Please specify the first name"
                    label="First name"
                    name="firstName"
                    onChange={handleChange}
                    required
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Last name"
                    name="lastName"
                    onChange={handleChange}
                    required
                    value={values.lastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    value={values.password}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="unitId"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.unitId}
                    variant="outlined"
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
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2,
              }}
            >
              <Button
                disabled={isSubmitting}
                type="submit"
                color="primary"
                variant="contained"
              >
                Save details
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default UserProfileDetails;
