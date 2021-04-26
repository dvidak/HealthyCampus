import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import sortBy from 'lodash/sortBy';
import React, { useCallback, useEffect, useState } from 'react';
import activityTypeService from '../../services/activity-type';
import ActivityTypeTable from '../components/activity-type/ActivityTypeTable';

const ActivityTypePage = () => {
  const [activityTypes, setActivityTypes] = useState<any>();

  const fetchActivityTypes = useCallback(async () => {
    const response = await activityTypeService.getActivityTypes();
    const mapResponse = mapValues(
      groupBy(response, (r) => r.type),
      (v) => sortBy(v, 'subType'),
    );
    setActivityTypes(mapResponse);
  }, []);

  useEffect(() => {
    fetchActivityTypes();
  }, [fetchActivityTypes]);

  const onSave = () => {};

  const onDelete = (id: number) => {};

  const onCreate = () => {};

  return (
    <ActivityTypeTable
      activityTypes={activityTypes}
      onSave={onSave}
      onCreate={onCreate}
      onDelete={onDelete}
    />
  );
};

export default ActivityTypePage;
