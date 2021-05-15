import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';

const CreateStudentActivity = () => {
  const onSubmit = () => {
    return;
  };

  const initialValues = {};

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
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
            <CardHeader
              title="some"
              titleTypographyProps={{ variant: 'h3', color: 'secondary' }}
            ></CardHeader>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={4}>
                  Add data for
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    name="distance"
                    label="Total distance in meters"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.distance}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    name="duration"
                    label="Total duration in minutes"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.duration}
                  />
                </Grid>
                <Grid item md={4}></Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    name="calories"
                    label="Total calories in kcal"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.calories}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    name="elevation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Total elevation in meters"
                    type="number"
                    defaultValue={values.elevation}
                  />
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

export default CreateStudentActivity;
