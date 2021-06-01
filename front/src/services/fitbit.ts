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

const getPeriodicElevationData = async (
  userId: number,
  baseDate: string,
  endDate: string,
) => {
  const response = await get(
    `fitbit/elevation/${userId}/${baseDate}/${endDate}`,
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
  getPeriodicElevationData,
  getPeriodicDistanceData,
};

export default fitbitService;
