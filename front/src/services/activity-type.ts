import { get } from './api';

const getActivityTypes = async () => {
  const response = await get('activity-type');

  return response;
};

const activityTypeService = {
  getActivityTypes,
};

export default activityTypeService;
