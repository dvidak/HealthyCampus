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
import { default as React } from 'react';
import { ActivityType } from '../../../models/ActivityType';
import ActivityTypeRow from './ActivtyTypeRow';

interface Props {
  activityTypes: Record<string, ActivityType[]>;
  onCreate: () => void;
  onSave: () => void;
  onDelete: (id: any) => void;
}

const ActivityTypeTable = ({
  activityTypes,
  onCreate,
  onSave,
  onDelete,
}: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography color="secondary" variant="h5">
                All activity types
              </Typography>
            </TableCell>
            <TableCell align="right">Create</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activityTypes &&
            Object.keys(activityTypes).map((type, index) => (
              <ActivityTypeRow
                type={type}
                activitySubtypes={activityTypes[type]}
                onCreate={onCreate}
                onDelete={onDelete}
              ></ActivityTypeRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivityTypeTable;
