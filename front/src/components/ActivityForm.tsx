import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import React from 'react';

interface Props {
  title: string;
  activityTypes: any;
  handleRequest: (data: any) => void;
}

const ActivityForm = ({ title, handleRequest, activityTypes }: Props) => {
  return (
    <Formik
      onSubmit={handleRequest}
      initialValues={{
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        goalDistance: 0,
        goalDuration: 0,
        goalCalories: 0,
        goalElevation: 0,
        activityTypeId: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Name is required'),
        description: Yup.string().max(255).required('Description is required'),
        startDate: Yup.date().required('Start date is required'),
        endDate: Yup.date()
          .min(Yup.ref('startDate'), "End date can't be before Start date")
          .required('End date is required'),
        activityTypeId: Yup.string().required('Activity type is required'),
      })}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        touched,
        errors,
      }: any) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <Divider />
            <CardContent>
              <Typography style={{ padding: 10 }} variant="h3">
                {title}
              </Typography>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    onChange={handleChange}
                    required
                    value={values.description}
                    variant="outlined"
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="startDate"
                    label="Start Date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.startDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(touched.startDate && errors.startDate)}
                    helperText={touched.startDate && errors.startDate}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="endDate"
                    label="End Date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.endDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(touched.endDate && errors.endDate)}
                    helperText={touched.endDate && errors.endDate}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="goalDistance"
                    label="Goal distance in [dodaj jedinicu]"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.goalDistance}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="goalDuration"
                    label="Goal duration in [dodaj jedinicu]"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.goalDuration}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="goalCalories"
                    label="Goal calories in [dodaj jedinicu]"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.goalCalories}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="goalElevation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Goal elevation in [dodaj jedinicu]"
                    type="number"
                    defaultValue={values.goalElevation}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    name="activityTypeId"
                    label=""
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.activityTypeId}
                    variant="outlined"
                    error={Boolean(
                      touched.activityTypeId && errors.activityTypeId,
                    )}
                    helperText={touched.activityTypeId && errors.activityTypeId}
                  >
                    {activityTypes &&
                      Object.keys(activityTypes).map((groupLabel) => (
                        <optgroup label={groupLabel}>
                          {Object.values(activityTypes[groupLabel]).map(
                            (option: any) => (
                              <option value={option.id}>
                                {option.subType}
                              </option>
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
                Create
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default ActivityForm;
