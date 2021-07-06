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
import VisibilityIcon from '@material-ui/icons/Visibility';
import WatchIcon from '@material-ui/icons/Watch';
import React from 'react';
import { generatePath } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { minuteInMs } from '../shared/const';
import { getDate } from '../shared/helpers';

interface Props {
  activities: any[];
}

const ConnectedActivitiesTable = ({ activities }: Props) => {
  const navigate = useNavigate();

  const onDetailsClick = (id: string) => {
    navigate(
      generatePath('/app/student-activity/details/:id', {
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
              <Typography color="secondary" variant="h4">
                Tracked activities
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
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Professor
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Description
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" color="secondary" variant="subtitle1">
                Period
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="right" color="secondary" variant="subtitle1">
                Distance
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="right" color="secondary" variant="subtitle1">
                Duration
              </Typography>
            </TableCell>{' '}
            <TableCell>
              <Typography align="right" color="secondary" variant="subtitle1">
                Calories
              </Typography>
            </TableCell>{' '}
            <TableCell>
              <Typography align="center" color="secondary" variant="subtitle1">
                Created
              </Typography>
            </TableCell>
            <TableCell></TableCell>
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
              <TableCell align="right">
                <span style={{ color: '#2c8c99' }}>
                  {Math.round(a.userActivities[0].distance)}
                </span>
                /{a.goalDistance} meter
              </TableCell>
              <TableCell align="right">
                <span style={{ color: '#2c8c99' }}>
                  {Math.round(a.userActivities[0].duration / minuteInMs)}
                </span>
                /{a.goalDuration / minuteInMs} minute
              </TableCell>
              <TableCell align="right">
                <span style={{ color: '#2c8c99' }}>
                  {Math.round(a.userActivities[0].calories)}
                </span>
                /{a.goalCalories} kcal
              </TableCell>
              <TableCell align="center">
                {a.userActivities[0].manual ? (
                  <PanToolIcon color="primary" />
                ) : (
                  <WatchIcon color="primary" />
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  color="secondary"
                  onClick={() => onDetailsClick(a.id)}
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ConnectedActivitiesTable;
