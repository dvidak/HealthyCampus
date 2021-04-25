import { Unit } from '../models/Unit';
import { UpdateUnitData } from '../models/Unit';
import { get, put, post, remove } from './api';

const getUnits = async () => {
  const response = await get('unit');

  return response as Unit[];
};

const updateUnit = async (data: UpdateUnitData) => {
  const response = await put(`unit/${data.unitId}`, data);

  return response;
};

const createUnit = async (data: {}) => {
  const response = await post('unit', data);

  return response;
};

const deleteUnit = async (id: number) => {
  const response = await remove(`unit/${id}`);

  return response;
};

const unitService = {
  getUnits,
  updateUnit,
  createUnit,
  deleteUnit,
};

export default unitService;
