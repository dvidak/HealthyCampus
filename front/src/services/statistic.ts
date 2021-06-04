import { get } from './api';

const getActivityCompletionRate = async (activityId: number) => {
  const response = await get(`statistic/activity/${activityId}`);

  return response.data;
};

const getActivityCaloriesPercentagesPerUsers = async (activityId: number) => {
  const userId = Number(localStorage.getItem('userId'));
  const response = await get(
    `statistic/activity/${activityId}/calories/${userId}`,
  );

  return response.data;
};

const getActivityDistancePercentagesByUser = async (activityId: number) => {
  const userId = Number(localStorage.getItem('userId'));
  const response = await get(
    `statistic/activity/${activityId}/distance/${userId}`,
  );

  return response.data;
};

const getActivityDurationPercentagesByUser = async (activityId: number) => {
  const userId = Number(localStorage.getItem('userId'));
  const response = await get(
    `statistic/activity/${activityId}/duration/${userId}`,
  );

  return response.data;
};

const getUnitActivityCompletionRateForUser = async (userId: number) => {
  const response = await get(`statistic/dashboard/${userId}`);

  return response;
};

const getProfesorActivitiesStatistic = async (userId: number) => {
  const response = await get(`statistic/dashboard/profesor/${userId}`);

  return response.data;
};

const statisticService = {
  getActivityCompletionRate,
  getActivityCaloriesPercentagesPerUsers,
  getActivityDistancePercentagesByUser,
  getActivityDurationPercentagesByUser,
  getUnitActivityCompletionRateForUser,
  getProfesorActivitiesStatistic,
};

export default statisticService;
