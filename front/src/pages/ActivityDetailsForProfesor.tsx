import { Box, Grid } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActivityForm from '../components/ActivityForm';
import StudentActivitiesTable from '../components/StudentActivitiesTable';
import { Activity } from '../models/Activity';
import activityService from '../services/activity';
import { minuteInMs } from '../shared/const';

const ActivityDetailsForProfesor = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      goalDuration: Number(data.goalDuration) * minuteInMs,
      goalCalories: Number(data.goalCalories),
      activityTypeId: Number(data.activityTypeId),
    };
    await activityService.updateActivity(parsedData);
    navigate('../../', { replace: true });
  };

  const handleDeleteActivity = async () => {
    const deleteReponse = await activityService.deleteActivity(Number(id));
    if (deleteReponse === 204) {
      navigate('../../', { replace: true });
    } else {
      setErrorMessage(deleteReponse.message);
    }
  };

  const getDateForDropdown = (date: any) => {
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
              buttonText="Save changes"
              handleRequest={handleUpdateActivity}
              handleDeleteRequest={handleDeleteActivity}
              errorMessage={errorMessage}
              deleteButton
              initialValues={{
                name: activity.name,
                description: activity.description,
                startDate: getDateForDropdown(activity.startDate),
                endDate: getDateForDropdown(activity.endDate),
                goalDistance: activity.goalDistance,
                goalDuration: activity.goalDuration / minuteInMs,
                goalCalories: activity.goalCalories,
                activityTypeId: activity.type?.id,
              }}
            />
          )}
        </Grid>
        <Grid item lg={7} md={6} xs={12}>
          {activity && activity.userActivities && (
            <StudentActivitiesTable
              studentActivities={activity.userActivities}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActivityDetailsForProfesor;
