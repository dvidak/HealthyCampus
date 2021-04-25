import { User } from '../models/User';
import { get } from './api';

const getUserById = async () => {
  const userId = localStorage.getItem('userId');
  const response = await get(`user/${userId}`);

  return response as User;
};

const userService = {
  getUserById,
};

export default userService;
