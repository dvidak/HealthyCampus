import { Box, Button } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { generatePath } from 'react-router';
import { useNavigate } from 'react-router-dom';
import AcitivtyTable from '../components/AcitivtyTable';
import { Activity } from '../models/Activity';
import activityService from '../services/activity';

const ActivityPage = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>();

  const fetchActivities = useCallback(async () => {
    const response = await activityService.getActivitiesForProf();
    setActivities(response);
  }, []);

  const onCreateClick = () => {
    navigate(generatePath('/app/activity/create'));
  };

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: 'background.default',
        width: '80%',
        margin: '2rem auto',
      }}
    >
      <AcitivtyTable activities={activities}></AcitivtyTable>
      <Button
        sx={{ position: 'absolute', right: 0, margin: '1rem 0' }}
        variant="contained"
        onClick={onCreateClick}
      >
        Create
      </Button>
    </Box>
  );
};

export default ActivityPage;
