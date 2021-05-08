import { Activity } from '../models/Activity';
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
import { generatePath } from 'react-router';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';

interface Props {
  activities: Activity[] | undefined;
}

const ActivityTable = ({ activities }: Props) => {
  const navigate = useNavigate();

  const onDetailsClick = (id: any) => {
    navigate(
      generatePath('/app/activity/details/:id', {
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
              <Typography color="secondary" variant="h5">
                Activities
              </Typography>
            </TableCell>
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
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Description
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Period
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Goal distance
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" color="secondary" variant="subtitle1">
                Goal duration
              </Typography>
            </TableCell>{' '}
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Goal calories
              </Typography>
            </TableCell>{' '}
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Goal elevation
              </Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities &&
            activities.map((activity) => (
              <TableRow key={activity.name}>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.description}</TableCell>
                <TableCell>
                  {activity.startDate} - {activity.endDate}
                </TableCell>
                <TableCell align="center">{activity.goalDistance}</TableCell>
                <TableCell align="center">{activity.goalDuration}</TableCell>
                <TableCell align="center">{activity.goalCalories}</TableCell>
                <TableCell align="center">{activity.goalElevation}</TableCell>
                <IconButton
                  color="secondary"
                  onClick={() => onDetailsClick(activity.id)}
                >
                  <VisibilityIcon />
                </IconButton>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivityTable;
