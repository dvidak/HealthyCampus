import {
  Button,
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
import { generatePath } from 'react-router';
import { useNavigate } from 'react-router-dom';
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
                All activities for <span> </span>{' '}
                {activities[0]?.createdBy?.unit?.name}
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
            <TableCell></TableCell>
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
              <TableCell align="center">{a.goalDistance} meter</TableCell>
              <TableCell align="center">
                {a.goalDuration / minuteInMs} minute
              </TableCell>
              <TableCell align="center">{a.goalCalories} kcal</TableCell>
              <TableCell align="center">{a.goalElevation} meter</TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => onTrackActivity(a.id)}
                >
                  Track F
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => onTrackManulClick(a.id)}
                >
                  Track M
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrackActivitiesTable;
