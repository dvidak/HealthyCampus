import {
  DataGrid,
  GridColumns,
  GridEditCellPropsParams,
} from '@material-ui/data-grid';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ActivityType } from '../models/ActivityType';
import activityTypeService from '../services/activity-type';

const columns: GridColumns = [
  { field: 'type', headerName: 'Type', width: 300, editable: true },
  { field: 'subType', headerName: 'Subtype', width: 300, editable: true },
];

const ActivityTypePage = () => {
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);

  const fetchActivityTypes = useCallback(async () => {
    const response = await activityTypeService.getActivityTypes();
    setActivityTypes(response);
  }, []);

  useEffect(() => {
    fetchActivityTypes();
  }, [fetchActivityTypes]);

  const handleOnEditCellChangeCommitted = useCallback(
    async (params: GridEditCellPropsParams) => {
      const { id, field, props } = params;
      const { value } = props;
      const row = activityTypes.filter((a) => a.id && a.id === id);
      const updatedData = {
        ...row[0],
        [field]: value,
      };
      await activityTypeService.updateActivityType(updatedData);
    },
    [activityTypes],
  );

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={activityTypes}
          columns={columns}
          disableColumnReorder={true}
          disableMultipleColumnsSorting={true}
          disableColumnMenu={true}
          onEditCellChangeCommitted={handleOnEditCellChangeCommitted}
        />
      </div>
    </div>
  );
};

export default ActivityTypePage;
