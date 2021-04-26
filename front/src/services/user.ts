import { User } from '../models/User';
import { get } from './api';

const getUserById = async () => {
  const userId = localStorage.getItem('userId');
  const response = await get(`user/${userId}`);

  return response as User;
};

const getUsers = async () => {
  const response = await get('user');

  return response;
};

const userService = {
  getUserById,
  getUsers,
};

export default userService;
