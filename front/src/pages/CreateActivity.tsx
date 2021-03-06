import { Box, Grid } from '@material-ui/core';

import { useNavigate } from 'react-router-dom';
import ActivityForm from '../components/ActivityForm';
import activityService from '../services/activity';
import { minuteInMs } from '../shared/const';

const CreateActivityPage = () => {
  const navigate = useNavigate();

  const handleCreateActivity = async (data: any) => {
    const parsedData = {
      ...data,
      goalDistance: Number(data.goalDistance),
      goalDuration: Number(data.goalDuration) * minuteInMs,
      goalCalories: Number(data.goalCalories),
      activityTypeId: Number(data.activityTypeId),
      userId: Number(localStorage.getItem('userId')),
    };

    await activityService.createActivity(parsedData);
    navigate('../', { replace: true });
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
        <Grid item lg={2} md={3} xs={12}></Grid>
        <Grid item lg={8} md={6} xs={12}>
          <ActivityForm
            title="Create new activity"
            buttonText="Create"
            handleRequest={handleCreateActivity}
            errorMessage={null}
            initialValues={{
              name: '',
              description: '',
              startDate: '',
              endDate: '',
              goalDistance: 0,
              goalDuration: 0,
              goalCalories: 0,
              activityTypeId: '',
            }}
          />
        </Grid>
        <Grid item lg={2} md={3} xs={12}></Grid>
      </Grid>
    </Box>
  );
};

export default CreateActivityPage;
