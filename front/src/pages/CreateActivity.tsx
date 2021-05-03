import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import sortBy from 'lodash/sortBy';
import React, { useCallback, useEffect, useState } from 'react';
import activityTypeService from '../services/activity-type';
import activityService from '../services/activity';
import ActivityForm from '../components/ActivityForm';
import { useNavigate } from 'react-router-dom';

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
    navigate('app/activity');
  };

  return (
    <ActivityForm
      handleRequest={handleCreateActivity}
      activityTypes={activityTypes}
    />
  );
};

export default CreateActivityPage;
