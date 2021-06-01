import { get } from './api';

const getActivityCompletionRate = async (activityId: number) => {
  const response = await get(`statistic/activity/${activityId}`);

  return response.data;
};

const getActivityCaloriesPercentagesPerUsers = async (activityId: number) => {
  const response = await get(`statistic/activity/${activityId}/calories`);

  return response.data;
};

const getActivityDistancePercentagesByUser = async (activityId: number) => {
  const response = await get(`statistic/activity/${activityId}/distance`);

  return response.data;
};

const getActivityDurationPercentagesByUser = async (activityId: number) => {
  const response = await get(`statistic/activity/${activityId}/duration`);

  return response.data;
};

const getUnitActivityCompletionRateForUser = async (userId: number) => {
  const response = await get(`statistic/dashboard/${userId}`);

  return response;
};

const statisticService = {
  getActivityCompletionRate,
  getActivityCaloriesPercentagesPerUsers,
  getActivityDistancePercentagesByUser,
  getActivityDurationPercentagesByUser,
  getUnitActivityCompletionRateForUser,
};

export default statisticService;
