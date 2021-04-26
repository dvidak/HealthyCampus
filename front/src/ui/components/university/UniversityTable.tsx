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
import { University } from '../../../models/University';
import CreateButton from '../common/CreateButton';
import UniversityRow from './UniversityRow';

interface Props {
  universities: University[] | null;
  onCreate: (type: string, universityId?: number) => void;
  onSaveUnit: (universityId: number, unitId: number, name: string) => void;
  onDelete: (type: string, id: number) => void;
}

const UniversityTable = ({
  universities,
  onCreate,
  onSaveUnit,
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
              <CreateButton onCreate={() => onCreate('university')} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {universities &&
            universities.map((university) => (
              <UniversityRow
                key={university.name}
                row={university}
                onSaveRow={onSaveUnit}
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
