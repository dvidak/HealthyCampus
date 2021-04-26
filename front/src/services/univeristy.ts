import { University } from '../models/University';
import { get, post, remove, put } from './api';

const getUniversities = async () => {
  const response = await get('university');

  return response.universities as University[];
};

const createUniversity = async (data: {}) => {
  const response = await post('university', data);

  return response as University[];
};

const deleteUniversity = async (id: number) => {
  const response = await remove(`university/${id}`);

  return response;
};

const updateUniversity = async (data: any) => {
  const response = await put(`university/${data.universityId}`, data);

  return response;
};

const universityService = {
  getUniversities,
  createUniversity,
  deleteUniversity,
  updateUniversity,
};

export default universityService;
