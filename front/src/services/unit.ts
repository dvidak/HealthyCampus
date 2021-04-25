import { Unit } from '../models/Unit';
import { UpdateUnitData } from '../models/Unit';
import { get, put } from './api';

const getUnits = async () => {
  const response = await get('unit');

  return response as Unit[];
};

const updateUnit = async (data: UpdateUnitData) => {
  const response = await put(`unit/${data.unitId}`, data);

  return response;
};

const unitService = {
  getUnits,
  updateUnit,
};

export default unitService;
