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

interface Props {
  title: string;
  activities: any[] | undefined;
}

const ActivitiesDetailsTable = ({ activities, title }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <Typography sx={{ margin: '10px' }} color="secondary" variant="h4">
              {title}
            </Typography>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Percentage
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities &&
            activities.map(
              (activity: {
                name: string | undefined;
                percentage: string | undefined;
              }) => (
                <TableRow>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>{activity.percentage}%</TableCell>
                </TableRow>
              ),
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivitiesDetailsTable;
