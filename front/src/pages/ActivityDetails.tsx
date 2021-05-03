import React, { useCallback, useEffect, useState } from 'react';
import { Activity } from '../models/Activity';

const ActivityDetails = () => {
  const [activity, setActivity] = useState<Activity>();

  const fetchActivity = useCallback(async () => {
    // const response = await activityService.getActivities();
    // setActivities(response);
  }, []);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  return <div>details</div>;
};

export default ActivityDetails;
