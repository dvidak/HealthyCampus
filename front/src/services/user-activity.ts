import { CreateUserActivity } from '../models/Activity';
import { post } from './api';

const createUserActivity = async (data: CreateUserActivity) => {
  const response = await post('user-activity', data);

  return response;
};

const userActivityService = {
  createUserActivity,
};

export default userActivityService;
