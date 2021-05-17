import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Activity, CreateUserActivity } from '../models/Activity';
import activityService from '../services/activity';
import userActivityService from '../services/user-activity';
import { minuteInMs } from '../shared/const';
import { getDate } from '../shared/helpers';

const CreateStudentActivity = () => {
  let { id } = useParams();

  const [activity, setActivity] = useState<Activity>();

  const fetchActivity = useCallback(async () => {
    const response = await activityService.getActivityById(Number(id));
    setActivity(response);
  }, [id]);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const onSubmit = async (data: any) => {
    const newUserActivity: CreateUserActivity = {
      ...data,
      duration: data.duration * minuteInMs,
      activityId: activity?.id,
      userId: Number(localStorage.getItem('userId')),
      manual: true,
    };

    await userActivityService.createUserActivity(newUserActivity);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        duration: 0,
        distance: 0,
        calories: 0,
        elevation: 0,
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
      }: any) => (
        <form onSubmit={handleSubmit}>
          {activity && (
            <Card style={{ width: '60%', margin: 'auto' }}>
              <CardHeader
                title="Manual add activity"
                titleTypographyProps={{ variant: 'h3', color: 'secondary' }}
              ></CardHeader>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={4}>
                    <Typography variant="body1">
                      Name:{' '}
                      <span style={{ color: '#2c8c99' }}>{activity.name}</span>
                    </Typography>
                    <Typography variant="body1">
                      Description:{' '}
                      <span style={{ color: '#2c8c99' }}>
                        {activity.description}
                      </span>
                    </Typography>
                    <Typography variant="body1">
                      Period:{' '}
                      <span style={{ color: '#2c8c99' }}>
                        {getDate(activity.startDate)} -{' '}
                        {getDate(activity.endDate)}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item md={3} xs={12}>
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
                  <Grid item md={3} xs={12}>
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
                  <Grid item md={4}>
                    <Typography variant="body1">
                      Goal distance:{' '}
                      <span style={{ color: '#2c8c99' }}>
                        {' '}
                        {activity.goalDistance}
                        {' meters '}
                      </span>
                    </Typography>
                    <Typography variant="body1">
                      Goal calories:{'  '}
                      <span style={{ color: '#2c8c99' }}>
                        {activity.goalCalories}
                        {' kcal'}
                      </span>
                    </Typography>
                    <Typography variant="body1">
                      Goal duration:{'  '}
                      <span style={{ color: '#2c8c99' }}>
                        {Math.round(activity.goalDuration / minuteInMs)}
                        {' minutes '}
                      </span>{' '}
                    </Typography>
                    <Typography variant="body1">
                      Goal elevation:{' '}
                      <span style={{ color: '#2c8c99' }}>
                        {activity.goalElevation}
                        {'  meters '}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item md={3} xs={12}>
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
                  <Grid item md={3} xs={12}>
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
          )}
        </form>
      )}
    </Formik>
  );
};

export default CreateStudentActivity;
