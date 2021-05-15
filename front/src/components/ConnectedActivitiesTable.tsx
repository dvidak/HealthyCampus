import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { minuteInMs } from '../shared/const';
import { getDate } from '../shared/helpers';
import PanToolIcon from '@material-ui/icons/PanTool';
import WatchIcon from '@material-ui/icons/Watch';

interface Props {
  activities: any[];
}

const ConnectedActivitiesTable = ({ activities }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="secondary" variant="h3">
                Done or in progress ??
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
                Profesor
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
              <Typography align="center" color="secondary" variant="subtitle1">
                Distance
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" color="secondary" variant="subtitle1">
                Duration
              </Typography>
            </TableCell>{' '}
            <TableCell>
              <Typography align="center" color="secondary" variant="subtitle1">
                Calories
              </Typography>
            </TableCell>{' '}
            <TableCell>
              <Typography align="center" color="secondary" variant="subtitle1">
                Elevation
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" color="secondary" variant="subtitle1">
                Created
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
              <TableCell align="center">
                <span style={{ color: '#2c8c99' }}>
                  {Math.round(a.userActivities[0].distance)}
                </span>
                /{a.goalDistance} meter
              </TableCell>
              <TableCell align="center">
                <span style={{ color: '#2c8c99' }}>
                  {Math.round(a.userActivities[0].duration / minuteInMs)}
                </span>
                /{a.goalDuration / minuteInMs} minute
              </TableCell>
              <TableCell align="center">
                <span style={{ color: '#2c8c99' }}>
                  {Math.round(a.userActivities[0].calories)}
                </span>
                /{a.goalCalories} kcal
              </TableCell>
              <TableCell align="center">
                <span style={{ color: '#2c8c99' }}>
                  {Math.round(a.userActivities[0].elevation)}
                </span>
                /{a.goalElevation} meter
              </TableCell>
              <TableCell align="center">
                {a.userActivities[0].manual ? (
                  <PanToolIcon color="primary" />
                ) : (
                  <WatchIcon color="primary" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ConnectedActivitiesTable;
