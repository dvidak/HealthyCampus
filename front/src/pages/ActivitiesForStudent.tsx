import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { DataGrid, GridColumns, GridRowId } from '@material-ui/data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import ModalWrapper from '../components/ModalWrapper';
import activityService from '../services/activity';
import { minuteInMs } from '../shared/const';
import { getDate } from '../shared/helpers';

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
  const [activities, setActivities] = useState<any[]>();
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

  const onSaveSelection = () => {
    setOpen(false);
    //save to back;
  };

  // Fetch activities for some unit
  const fetchActivities = useCallback(async () => {
    const response = await activityService.getActivitiesForStudentBasedOnUnit();
    setActivities(response);
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

  const onTrackActivity = (activityId: string) => {
    setOpen(true);
    const { startDate, endDate } = activities?.find((a) => a.id === activityId);
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

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="secondary" variant="h3">
                    All activities for{' '}
                    {activities && activities[0]?.createdBy?.unit?.name}
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography color="secondary" variant="subtitle1">
                    Profesor
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    align="center"
                    color="secondary"
                    variant="subtitle1"
                  >
                    Period
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    align="center"
                    color="secondary"
                    variant="subtitle1"
                  >
                    Distance
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    align="center"
                    color="secondary"
                    variant="subtitle1"
                  >
                    Duration
                  </Typography>
                </TableCell>{' '}
                <TableCell>
                  <Typography
                    align="center"
                    color="secondary"
                    variant="subtitle1"
                  >
                    Calories
                  </Typography>
                </TableCell>{' '}
                <TableCell>
                  <Typography
                    align="center"
                    color="secondary"
                    variant="subtitle1"
                  >
                    Elevation
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities &&
                activities.map((a: any) => (
                  <TableRow>
                    <TableCell>
                      {a.createdBy.user.firstName} {a.createdBy.user.lastName}
                    </TableCell>
                    <TableCell align="center">
                      {getDate(a.startDate)} - {getDate(a.endDate)}
                    </TableCell>
                    <TableCell align="center">{a.goalDistance} meter</TableCell>
                    <TableCell align="center">
                      {a.goalDuration / minuteInMs} minute
                    </TableCell>
                    <TableCell align="center">{a.goalCalories} kcal</TableCell>
                    <TableCell align="center">
                      {a.goalElevation} meter
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => onTrackActivity(a.id)}
                      >
                        Track
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default ActivitiesForStudent;
