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
import { default as React, useEffect, useState } from 'react';
import { University } from '../../models/University';
import universityService from '../../services/univeristy';
import unitService from '../../services/unit';

import UniversityRow from '../components/university/UniversityRow';
import { UpdateUnitData } from '../../models/Unit';

const UniversityPage = () => {
  const [universities, setUniversities] = useState<University[] | null>(null);

  const fetchUniveristies = async () => {
    const fetchedUniversities = await universityService.getUniversities();
    setUniversities(fetchedUniversities);
  };

  useEffect(() => {
    fetchUniveristies();
  }, []);

  const onSaveUnit = async (
    universityId: number,
    unitId: number,
    name: string,
  ) => {
    const updateUnitData: UpdateUnitData = {
      universityId,
      unitId,
      name,
    };

    const response = await unitService.updateUnit(updateUnitData);
    if (response.statusCode === 200) {
      fetchUniveristies();
    }
  };

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
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {universities &&
            universities.map((university) => (
              <UniversityRow
                key={university.name}
                row={university}
                onSaveRow={onSaveUnit}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UniversityPage;
