import { get } from './api';

const getPeriodicCaloriesData = async (
  userId: number,
  baseDate: string,
  endDate: string,
) => {
  const response = await get(
    `fitbit/activityCalories/${userId}/${baseDate}/${endDate}`,
  );
  return response.data;
};

const getPeriodicStepsData = async (
  userId: number,
  baseDate: string,
  endDate: string,
) => {
  const response = await get(`fitbit/steps/${userId}/${baseDate}/${endDate}`);
  return response.data;
};

const getPeriodicFloorsData = async (
  userId: number,
  baseDate: string,
  endDate: string,
) => {
  const response = await get(`fitbit/floors/${userId}/${baseDate}/${endDate}`);
  return response.data;
};

const getVeryActiveMinutesData = async (
  userId: number,
  baseDate: string,
  endDate: string,
) => {
  const response = await get(
    `fitbit/minutesVeryActive/${userId}/${baseDate}/${endDate}`,
  );
  return response.data;
};

const getLightlyActiveMinutesData = async (
  userId: number,
  baseDate: string,
  endDate: string,
) => {
  const response = await get(
    `fitbit/minutesLightlyActive/${userId}/${baseDate}/${endDate}`,
  );
  return response.data;
};

const getPeriodicDistanceData = async (
  userId: number,
  baseDate: string,
  endDate: string,
) => {
  const response = await get(
    `fitbit/distance/${userId}/${baseDate}/${endDate}`,
  );
  return response.data;
};

const fitbitService = {
  getPeriodicCaloriesData,
  getPeriodicStepsData,
  getPeriodicFloorsData,
  getVeryActiveMinutesData,
  getPeriodicDistanceData,
  getLightlyActiveMinutesData,
};

export default fitbitService;
