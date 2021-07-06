import { Box, Button, Container, Typography } from '@material-ui/core';
import { DataGrid, GridColumns, GridRowId } from '@material-ui/data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import ModalWrapper from '../components/ModalWrapper';
import TrackActivitiesTable from '../components/TrackActivitiesTable';
import { CreateUserActivity } from '../models/Activity';
import activityService from '../services/activity';
import userActivityService from '../services/user-activity';
import { minuteInMs } from '../shared/const';

const columns: GridColumns = [
  { field: 'name', headerName: 'Name', width: 180 },
  {
    field: 'calories',
    headerName: 'Calories(kcal)',
    headerAlign: 'right',
    align: 'right',
    sortable: false,
    width: 120,
  },
  {
    field: 'duration',
    headerName: 'Duration(min)',
    headerAlign: 'right',
    align: 'right',
    sortable: false,
    width: 120,
  },
  {
    field: 'distance',
    headerName: 'Distance(m)',
    sortable: false,
    headerAlign: 'right',
    align: 'right',
    width: 115,
  },
  {
    field: 'steps',
    headerName: 'Steps',
    headerAlign: 'right',
    align: 'right',
    sortable: false,
    width: 90,
  },
  { field: 'startDate', headerName: 'Date', headerAlign: 'center', width: 105 },
  { field: 'startTime', headerName: 'Start time', headerAlign: 'center' },
];

const ActivitiesByUnitForStudent = () => {
  const [connectToActivity, setConnectToActivity] = useState<number>(0);

  const [allActivities, setAllActivities] = useState<any>([]);
  const [fitBitAcctivities, setFitbitAcctivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState<any>([]);

  const [open, setOpen] = React.useState(false);

  const onSelectionModelChange = (e: {
    selectionModel: Iterable<unknown> | null | undefined;
  }) => {
    const selectedIDs = new Set(e.selectionModel);
    const selectedRowData = fitBitAcctivities.filter((row: { id: GridRowId }) =>
      selectedIDs.has(row.id),
    );
    setSelectedActivities(selectedRowData);
  };

  const onSaveSelection = async () => {
    setOpen(false);

    let sumDistance: number = 0;
    let sumDuration: number = 0;
    let sumCalories: number = 0;
    let sumSteps: number = 0;
    selectedActivities.forEach(
      (element: {
        distance: number;
        calories: number;
        duration: number;
        steps: number;
      }) => {
        sumDistance += element.distance;
        sumCalories += element.calories;
        sumDuration += element.duration;
        sumSteps += element.steps;
      },
    );

    const newUserActivity: CreateUserActivity = {
      activityId: connectToActivity,
      distance: sumDistance === 0 ? sumSteps * 0.762 : sumDistance,
      duration: sumDuration * minuteInMs,
      calories: sumCalories,
      userId: Number(localStorage.getItem('userId')),
      manual: false,
    };

    await userActivityService.createUserActivity(newUserActivity);
  };

  const fetchActivities = useCallback(async () => {
    const response = await activityService.getActivitiesForStudentBasedOnUnit();
    setAllActivities(response.other);
  }, []);

  const fetchPossibleFitbitActivities = useCallback(
    async (startDate: string, endDate: string) => {
      const response = await activityService.getPossibleFitbitAcctivities(
        startDate,
        endDate,
      );
      let mapped: any = [];

      let index = 0;
      for (const fitbitActivity of Object.values(response)) {
        const a = {
          id: index,
          ...fitbitActivity,
        };
        index++;
        mapped.push(a);
      }
      setFitbitAcctivities(mapped);
    },
    [],
  );

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const onTrackActivity = (activityId: number) => {
    setOpen(true);
    setConnectToActivity(activityId);

    const { startDate, endDate } = allActivities?.find(
      (a: { id: number }) => a.id === activityId,
    );
    fetchPossibleFitbitActivities(startDate, endDate);
  };

  const body = (
    <div style={{ width: 900, position: 'relative' }}>
      <Typography
        color="secondary"
        variant="h3"
        style={{ padding: '0 0 10px 0' }}
      >
        Map fitbit recorded data to task
      </Typography>
      <div style={{ height: 500, width: '100%' }}>
        {fitBitAcctivities !== [] && (
          <DataGrid
            rows={fitBitAcctivities}
            columns={columns}
            disableColumnReorder={true}
            disableMultipleColumnsSorting={true}
            disableColumnMenu={true}
            checkboxSelection
            onSelectionModelChange={onSelectionModelChange}
          />
        )}
      </div>
      <Button
        style={{ position: 'absolute', bottom: 10, left: 10 }}
        variant="contained"
        color="secondary"
        onClick={onSaveSelection}
      >
        Save selection
      </Button>
    </div>
  );

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <ModalWrapper
          body={body}
          isOpen={open}
          handleClose={() => setOpen(false)}
        ></ModalWrapper>
        {allActivities && (
          <Typography
            style={{ padding: 20 }}
            align="center"
            color="primary"
            variant="h3"
          >
            {' '}
            {allActivities[0]?.createdBy?.unit?.name}
          </Typography>
        )}
        {allActivities && (
          <TrackActivitiesTable
            activities={allActivities}
            onTrackActivity={onTrackActivity}
          />
        )}
      </Container>
    </Box>
  );
};

export default ActivitiesByUnitForStudent;
