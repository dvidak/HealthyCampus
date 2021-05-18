import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import PanToolIcon from '@material-ui/icons/PanTool';
import WatchIcon from '@material-ui/icons/Watch';
import React from 'react';
import { generatePath } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { minuteInMs } from '../shared/const';
import { getDate } from '../shared/helpers';

interface Props {
  activities: any[];
  onTrackActivity: (id: number) => void;
}

const TrackActivitiesTable = ({ activities, onTrackActivity }: Props) => {
  const navigate = useNavigate();

  const onTrackManulClick = (id: string) => {
    navigate(
      generatePath('/app/student-activity/create/:id', {
        id: id,
      }),
    );
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="secondary" variant="h3">
                All available activities
              </Typography>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="secondary">Profesor</Typography>
            </TableCell>
            <TableCell>
              <Typography color="secondary">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography color="secondary">Description</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" color="secondary">
                Period
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" color="secondary">
                Distance
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" color="secondary">
                Duration
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" color="secondary">
                Calories
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" color="secondary">
                Track
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" color="secondary">
                Manual
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((a: any) => (
            <TableRow>
              <TableCell>
                {a.createdBy.user.firstName} {a.createdBy.user.lastName}
              </TableCell>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.description}</TableCell>
              <TableCell align="center">
                {getDate(a.startDate)} - {getDate(a.endDate)}
              </TableCell>
              <TableCell align="center">{a.goalDistance} meter</TableCell>
              <TableCell align="center">
                {a.goalDuration / minuteInMs} minute
              </TableCell>
              <TableCell align="center">{a.goalCalories} kcal</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => onTrackActivity(a.id)}
                >
                  <WatchIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => onTrackManulClick(a.id)}
                >
                  <PanToolIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrackActivitiesTable;
