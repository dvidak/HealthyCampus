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
                Student activities
              </Typography>
            </TableCell>
            <TableCell></TableCell>
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
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentActivities.map((a: StudentActivity) => (
            <TableRow>
              <TableCell>
                {a.student.user.firstName} {a.student.user.lastName}
              </TableCell>
              <TableCell align="center">
                {Math.round(a.distance)} meter
              </TableCell>
              <TableCell align="center">
                {Math.round(a.duration / minuteInMs)} minute
              </TableCell>
              <TableCell align="center">{a.calories} kcal</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentActivitiesTable;
