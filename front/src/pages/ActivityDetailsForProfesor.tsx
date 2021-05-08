import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActivityForm from '../components/ActivityForm';
import { Activity, StudentActivity } from '../models/Activity';
import activityService from '../services/activity';

const ActivityDetailsForProfesor = () => {
  let { id } = useParams();

  const [activity, setActivity] = useState<Activity>();

  const fetchActivity = useCallback(async () => {
    const response = await activityService.getActivityById(Number(id));
    setActivity(response);
  }, [id]);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const handleUpdateActivity = async (data: any) => {
    const parsedData = {
      ...data,
      id: activity?.id,
      goalDistance: Number(data.goalDistance),
      goalDuration: Number(data.goalDuration),
      goalCalories: Number(data.goalCalories),
      goalElevation: Number(data.goalElevation),
      activityTypeId: Number(data.activityTypeId),
    };
    await activityService.updateActivity(parsedData);
  };

  const getDate = (date: any) => {
    const parsed = new Date(parseInt(date));
    const day = parsed.getDate();
    const month = parsed.getMonth() + 1;
    const year = parsed.getFullYear();
    const dayParsed = day < 10 ? `0${day}` : day;
    const monthParsed = month < 10 ? `0${month}` : month;

    return `${year}-${monthParsed}-${dayParsed}`;
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    >
      <Grid container spacing={3}>
        <Grid item lg={1} md={1}></Grid>
        <Grid item lg={3} md={6} xs={12}>
          {activity && (
            <ActivityForm
              title="Edit activity"
              buttonText="Edit"
              handleRequest={handleUpdateActivity}
              initialValues={{
                name: activity.name,
                description: activity.description,
                startDate: getDate(activity.startDate),
                endDate: getDate(activity.endDate),
                goalDistance: activity.goalDistance,
                goalDuration: activity.goalDuration,
                goalCalories: activity.goalCalories,
                goalElevation: activity.goalElevation,
                activityTypeId: activity.type?.id,
              }}
            />
          )}
        </Grid>
        <Grid item lg={7} md={6} xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color="secondary" variant="h5">
                      Student activities
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="secondary" variant="subtitle1">
                      Student
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      align="center"
                      color="secondary"
                      variant="subtitle1"
                    >
                      Distance
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      align="center"
                      color="secondary"
                      variant="subtitle1"
                    >
                      Duration
                    </Typography>
                  </TableCell>{' '}
                  <TableCell>
                    <Typography color="secondary" variant="subtitle1">
                      Calories
                    </Typography>
                  </TableCell>{' '}
                  <TableCell>
                    <Typography color="secondary" variant="subtitle1">
                      Elevation
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activity &&
                  activity.userActivities &&
                  activity.userActivities.map((a: StudentActivity) => (
                    <TableRow>
                      <TableCell>
                        {a.student.firstName} {a.student.lastName}
                      </TableCell>
                      <TableCell align="center">{a.distance}</TableCell>
                      <TableCell align="center">{a.duration}</TableCell>
                      <TableCell align="center">{a.calories}</TableCell>
                      <TableCell align="center">{a.elevation}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActivityDetailsForProfesor;
