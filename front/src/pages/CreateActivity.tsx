import { Box, Grid } from '@material-ui/core';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import sortBy from 'lodash/sortBy';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityForm from '../components/ActivityForm';
import activityService from '../services/activity';
import activityTypeService from '../services/activity-type';

const CreateActivityPage = () => {
  const [activityTypes, setActivityTypes] = useState<any>();
  const navigate = useNavigate();

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

  const handleCreateActivity = async (data: any) => {
    const parsedData = {
      ...data,
      goalDistance: Number(data.goalDistance),
      goalDuration: Number(data.goalDuration),
      goalCalories: Number(data.goalCalories),
      goalElevation: Number(data.goalElevation),
      activityTypeId: Number(data.activityTypeId),
      userId: Number(localStorage.getItem('userId')),
    };
    await activityService.createActivity(parsedData);
    navigate('');
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
            handleRequest={handleCreateActivity}
            activityTypes={activityTypes}
          />
        </Grid>
        <Grid item lg={2} md={3} xs={12}></Grid>
      </Grid>
    </Box>
  );
};

export default CreateActivityPage;
