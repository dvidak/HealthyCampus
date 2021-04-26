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
import { RowType } from '../../../models/Unit';
import { University } from '../../../models/University';
import CreateButton from '../common/CreateButton';
import UniversityRow from './UniversityRow';

interface Props {
  universities: University[] | null;
  onCreate: (type: RowType, universityId?: number) => void;
  onSave: (
    universityId: number,
    name: string,
    type: RowType,
    unitId?: number,
  ) => void;
  onDelete: (type: RowType, id: number) => void;
}

const UniversityTable = ({
  universities,
  onCreate,
  onSave,
  onDelete,
}: Props) => {
  return (
    <TableContainer className="university-table" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography color="secondary" variant="h5">
                All universities
              </Typography>
            </TableCell>
            <TableCell align="right">
              <CreateButton onCreate={() => onCreate(RowType.university)} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {universities &&
            universities.map((university) => (
              <UniversityRow
                key={university.name}
                row={university}
                onSaveRow={onSave}
                onCreate={onCreate}
                onDelete={onDelete}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UniversityTable;
