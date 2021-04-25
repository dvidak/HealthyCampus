import { Unit } from '../models/Unit';
import { get } from './api';

const getUnits = async () => {
	const response = await get('unit');

	return response as Unit[];
};

const unitService = {
	getUnits,
};

export default unitService;
