import { University } from '../models/University';
import { get, post, remove } from './api';

const getUniversities = async () => {
  const response = await get('university');

  return response as University[];
};

const createUniversity = async (data: {}) => {
  const response = await post('university', data);

  return response as University[];
};

const deleteUniversity = async (id: number) => {
  const response = await remove(`university/${id}`);

  return response;
};

const universityService = {
  getUniversities,
  createUniversity,
  deleteUniversity,
};

export default universityService;
