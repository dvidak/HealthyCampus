import { get } from './api';

const getPeriodicCaloriesData = async (userId: number) => {
  const response = await get(`fitbit/calories/${userId}`);
  return response.data;
};

const getPeriodicStepsData = async (userId: number) => {
  const response = await get(`fitbit/steps/${userId}`);
  return response.data;
};

const getPeriodicMinutesLightlyActiveData = async (userId: number) => {
  const response = await get(`fitbit/minutes-lightly-active/${userId}`);
  return response.data;
};

const getPeriodicMinutesFairlyActiveData = async (userId: number) => {
  const response = await get(`fitbit/minutes-fairly-active/${userId}`);
  return response.data;
};

const fitbitService = {
  getPeriodicCaloriesData,
  getPeriodicStepsData,
  getPeriodicMinutesLightlyActiveData,
  getPeriodicMinutesFairlyActiveData,
};

export default fitbitService;
