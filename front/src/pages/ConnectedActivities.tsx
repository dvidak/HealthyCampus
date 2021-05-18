import { Box, Container } from '@material-ui/core';
import { default as React, useCallback, useEffect, useState } from 'react';
import ConnectedActivitiesTable from '../components/ConnectedActivitiesTable';
import activityService from '../services/activity';

const ConnectedActivities = () => {
  const [connectedUserActivities, setConnectedUserActivities] =
    useState<any[]>();

  const fetchActivities = useCallback(async () => {
    const response = await activityService.getActivitiesForStudentBasedOnUnit();
    setConnectedUserActivities(response.connected);
  }, []);

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
      <Container>
        {connectedUserActivities && (
          <ConnectedActivitiesTable activities={connectedUserActivities} />
        )}
      </Container>
    </Box>
  );
};

export default ConnectedActivities;
