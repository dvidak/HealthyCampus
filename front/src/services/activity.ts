import { Activity } from '../models/Activity';
import { get, post, put, remove } from './api';

const getActivities = async () => {
  const response = await get('activity');

  return response as Activity[];
};

const getActivitiesForProf = async () => {
  const userId = localStorage.getItem('userId');
  const response = await get(`activity/prof/${userId}`);

  return response as Activity[];
};

const getActivitiesForStudentBasedOnUnit = async () => {
  const userId = localStorage.getItem('userId');
  const response = await get(`activity/student/${userId}`);

  return response;
};

// Function that will be used in modal to connect fitbit with some of the activities
const getPossibleFitbitAcctivities = async (
  startDate: string,
  endDate: string,
) => {
  const userId = localStorage.getItem('userId');
  const response = await get(
    `activity/fitbit/${userId}/${startDate}/${endDate}`,
  );

  return response as Activity[];
};

const createActivity = async (data: Activity) => {
  const response = await post('activity', data);

  return response;
};

const deleteActivity = async (id: number) => {
  const response = await remove(`activity/${id}`);

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
  getPossibleFitbitAcctivities,
  getActivitiesForStudentBasedOnUnit,
  getActivitiesForProf,
  getActivityById,
  updateActivity,
  deleteActivity,
};

export default activityService;
