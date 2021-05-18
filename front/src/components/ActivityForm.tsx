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
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import sortBy from 'lodash/sortBy';
import { default as React, useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import activityTypeService from '../services/activity-type';

interface Props {
  title: string;
  buttonText: string;
  handleRequest: (data: any) => void;
  initialValues: any;
}

const ActivityForm = ({
  title,
  buttonText,
  initialValues,
  handleRequest,
}: Props) => {
  const [activityTypes, setActivityTypes] = useState<any>();

  const fetchActivityTypes = useCallback(async () => {
    const response = await activityTypeService.getActivityTypes();
    const mapResponse = mapValues(
      groupBy(response, (r) => r.type),
      (v) => sortBy(v, 'subType'),
    );
    setActivityTypes(mapResponse);
  }, []);

  useEffect(() => {
    fetchActivityTypes();
  }, [fetchActivityTypes]);
  return (
    <Formik
      onSubmit={handleRequest}
      initialValues={initialValues}
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
            <CardHeader
              title={title}
              titleTypographyProps={{ variant: 'h3', color: 'secondary' }}
            ></CardHeader>
            <CardContent>
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
                    label="Goal distance in meters"
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
                    label="Goal duration in minutes"
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
                    label="Goal calories in kcal"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={values.goalCalories}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
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
                {buttonText}
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default ActivityForm;
