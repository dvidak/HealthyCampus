import { Box, Button, Container, Typography } from '@material-ui/core';
import { DataGrid, GridColumns, GridRowId } from '@material-ui/data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import ConnectedActivitiesTable from '../components/ConnectedActivitiesTable';
import ModalWrapper from '../components/ModalWrapper';
import TrackActivitiesTable from '../components/TrackActivitiesTable';
import { CreateUserActivity } from '../models/Activity';
import activityService from '../services/activity';
import userActivityService from '../services/user-activity';
import { minuteInMs } from '../shared/const';

const columns: GridColumns = [
  { field: 'name', headerName: 'Name' },
  {
    field: 'calories',
    headerName: 'Calories',
  },
  {
    field: 'duration',
    headerName: 'Duration',
  },
  {
    field: 'distance',
    headerName: 'Distance',
    sortable: false,
  },
  {
    field: 'steps',
    headerName: 'Steps',
  },
  { field: 'startDate', headerName: 'Start date' },
  { field: 'startTime', headerName: 'Start time' },
];

const ActivitiesForStudent = () => {
  const [connectToActivity, setConnectToActivity] = useState<number>(0);
  const [connectedUserActivities, setConnectedUserActivities] =
    useState<any[]>();
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
    let sumElevation: number = 0;
    selectedActivities.forEach(
      (element: {
        distance: number;
        calories: number;
        duration: number;
        steps: number;
        elevation: number;
      }) => {
        sumDistance += element.distance;
        sumCalories += element.calories;
        sumDuration += element.duration;
        sumSteps += element.steps;
        sumElevation += element.elevation;
      },
    );

    const newUserActivity: CreateUserActivity = {
      activityId: connectToActivity,
      distance: sumDistance === 0 ? sumSteps * 0.762 : sumDistance,
      duration: sumDuration * minuteInMs,
      calories: sumCalories,
      elevation: sumElevation || 0,
      userId: Number(localStorage.getItem('userId')),
      manual: false,
    };

    await userActivityService.createUserActivity(newUserActivity);
  };

  const fetchActivities = useCallback(async () => {
    const response = await activityService.getActivitiesForStudentBasedOnUnit();
    setConnectedUserActivities(response.connected);
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
    <div style={{ width: 800, position: 'relative' }}>
      <Typography color="secondary" variant="h3">
        Chose activities you want to use
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
          <TrackActivitiesTable
            activities={allActivities}
            onTrackActivity={onTrackActivity}
          />
        )}
      </Container>
      <br></br>

      <Container>
        {connectedUserActivities && (
          <ConnectedActivitiesTable activities={connectedUserActivities} />
        )}
      </Container>
    </Box>
  );
};

export default ActivitiesForStudent;
