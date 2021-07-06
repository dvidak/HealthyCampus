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
import { StudentActivity } from '../models/Activity';
import { minuteInMs } from '../shared/const';

interface Props {
  studentActivities: StudentActivity[];
}

const StudentActivitiesTable = ({ studentActivities }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="secondary" variant="h3">
                Student activity
              </Typography>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Student
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="right" color="secondary" variant="subtitle1">
                Distance (m)
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="right" color="secondary" variant="subtitle1">
                Duration (min)
              </Typography>
            </TableCell>{' '}
            <TableCell>
              <Typography align="right" color="secondary" variant="subtitle1">
                Calories (kcal)
              </Typography>
            </TableCell>{' '}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentActivities.map((a: StudentActivity) => (
            <TableRow>
              <TableCell>
                {a.student.user.firstName} {a.student.user.lastName}
              </TableCell>
              <TableCell align="right">{Math.round(a.distance)}</TableCell>
              <TableCell align="right">
                {Math.round(a.duration / minuteInMs)}
              </TableCell>
              <TableCell align="right">{a.calories}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentActivitiesTable;
