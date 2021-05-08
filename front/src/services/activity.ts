import { Activity } from '../models/Activity';
import { get, post, put } from './api';

const getActivities = async () => {
  const response = await get('activity');

  return response as Activity[];
};

const getActivitiesForProf = async () => {
  const userId = localStorage.getItem('userId');
  const response = await get(`activity/prof/${userId}`);

  return response as Activity[];
};

const getActivitiesForSpecificUser = async () => {
  const userId = localStorage.getItem('userId');
  const response = await get(`activity/${userId}`);

  return response as Activity[];
};

const createActivity = async (data: Activity) => {
  const response = await post('activity', data);

  return response;
};

const getActivityById = async (id: number) => {
  const response = await get(`activity/${id}`);

  return response;
};

const updateActivity = async (data: any) => {
  const response = await put(`activity/${data.id}`, data);

  return response;
};

const activityService = {
  getActivities,
  createActivity,
  getActivitiesForSpecificUser,
  getActivitiesForProf,
  getActivityById,
  updateActivity,
};

export default activityService;
