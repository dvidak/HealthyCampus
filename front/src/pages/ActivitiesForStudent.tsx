import {
  Box,
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
import { DataGrid, GridColumns } from '@material-ui/data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import ModalWrapper from '../components/ModalWrapper';
import activityService from '../services/activity';
import { minuteInMs } from '../shared/const';
import { getDate } from '../shared/helpers';

const columns: GridColumns = [
  { field: 'name', headerName: 'Name', editable: false, width: 100 },
  {
    field: 'description',
    headerName: 'Description',
    editable: false,
    width: 300,
  },
  { field: 'startDate', headerName: 'Start date', width: 150, editable: false },
  { field: 'startTime', headerName: 'Start time', width: 150, editable: false },
];

const ActivitiesForStudent = () => {
  const [activities, setActivities] = useState<any[]>();
  const [fitBitAcctivities, setFitbitAcctivities] = useState([]);

  const [open, setOpen] = React.useState(false);

  // Fetch activities for some unit
  const fetchActivities = useCallback(async () => {
    const response = await activityService.getActivitiesForStudentBasedOnUnit();
    setActivities(response);
  }, []);

  const fetchPossibleFitbitAcctivities = useCallback(async () => {
    const response = await activityService.getPossibleFitbitAcctivities();
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
  }, []);

  useEffect(() => {
    fetchActivities();
    fetchPossibleFitbitAcctivities();
  }, [fetchActivities, fetchPossibleFitbitAcctivities]);

  console.log({ fitBitAcctivities });

  const body = (
    <div style={{ width: 700 }}>
      <div style={{ height: 500, width: '100%' }}>
        {' '}
        {fitBitAcctivities && (
          <DataGrid
            rows={fitBitAcctivities}
            columns={columns}
            disableColumnReorder={true}
            disableMultipleColumnsSorting={true}
            disableColumnMenu={true}
            checkboxSelection
          />
        )}
      </div>
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
        <button type="button" onClick={() => setOpen(true)}>
          Open Modal
        </button>

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
                    <TableCell>I did this button</TableCell>
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
