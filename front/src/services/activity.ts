import { Activity } from '../models/Activity';
import { get, post } from './api';

const getActivities = async () => {
  const response = await get('activity');

  return response as Activity[];
};

const createActivity = async (data: Activity) => {
  const response = await post('activity', data);

  return response;
};

const activityService = {
  getActivities,
  createActivity,
};

export default activityService;
