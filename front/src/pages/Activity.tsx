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
    const response = await activityService.getActivities();
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
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    >
      <Button onClick={onCreateClick}>Create</Button>
      <AcitivtyTable activities={activities}></AcitivtyTable>
    </Box>
  );
};

export default ActivityPage;
