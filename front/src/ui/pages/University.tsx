import React, { useEffect, useState } from 'react';
import { University } from '../../models/University';
import universityService from '../../services/univeristy';

const UniversityPage = () => {
	const [universities, setUniversities] = useState<University[] | null>(null);

	useEffect(() => {
		(async function fetchUniveristies() {
			const fetchedUniversities = await universityService.getUniversities();
			setUniversities(fetchedUniversities);
		})();
	}, []);

	return <div>University</div>;
};

export default UniversityPage;
