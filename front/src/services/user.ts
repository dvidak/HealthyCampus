import { User, UserUpdateData } from '../models/User';
import { get, put } from './api';

const getUserById = async () => {
  const userId = localStorage.getItem('userId');
  const response = await get(`user/${userId}`);

  return response as User;
};

const getUsers = async () => {
  const response = await get('user');

  return response as User[];
};

const updateUser = async (data: UserUpdateData) => {
  const response = await put(`user/${data.id}`, data);
  return response;
};

const updateUserImage = async (data: { id: number; url: string }) => {
  const response = await put(`user/${data.id}/image`, data);
  return response;
};

const userService = {
  getUserById,
  getUsers,
  updateUser,
  updateUserImage,
};

export default userService;
