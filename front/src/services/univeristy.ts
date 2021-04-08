import { University } from '../models/University';
import { get } from './api';

const getUniversities = async () => {
	const response = await get('university');

	return response as University[];
};

const universityService = {
	getUniversities,
};

export default universityService;
