import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { User } from '../models/User';
import universityService from '../services/univeristy';
import { universityGroupOptions } from '../shared/helpers';

interface Props {
  user: User;
}

const UserProfileDetails = ({ user }: Props) => {
  const [universityOptions, setUniversityOptions] = useState<any>();
  const [values, setValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    unit: user.userUnit.unit.name,
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    async function fetchUniveristies() {
      const universities = await universityService.getUniversities();
      setUniversityOptions(universityGroupOptions(universities));
    }

    fetchUniveristies();
  }, []);

  return (
    <form autoComplete="off">
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
                name="unit"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.unit}
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
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default UserProfileDetails;
