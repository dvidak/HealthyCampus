import { ActivityType } from '../models/ActivityType';
import { get, put } from './api';

const getActivityTypes = async () => {
  const response = await get('activity-type');

  return response;
};

const updateActivityType = async (data: ActivityType) => {
  const response = await put(`activity-type/${data.id}`, data);

  return response;
};

const activityTypeService = {
  getActivityTypes,
  updateActivityType,
};

export default activityTypeService;
