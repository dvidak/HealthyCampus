import { Container, Box, Grid } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Activity } from '../models/Activity';
import activityService from '../services/activity';

const ActivitiesForStudent = () => {
  const [activities, setActivities] = useState<Activity[]>();

  const fetchActivities = useCallback(async () => {
    const response = await activityService.getActivitiesForSpecificUser();
    setActivities(response);
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
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid style={{ backgroundColor: 'blue' }} item lg={6} md={6} xs={12}>
            one
          </Grid>
          <Grid
            style={{ backgroundColor: 'yellow' }}
            item
            lg={6}
            md={6}
            xs={12}
          >
            two
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ActivitiesForStudent;
