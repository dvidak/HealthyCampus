import {
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { default as React, useCallback, useEffect, useState } from 'react';
import { UpdateUnitData } from '../../models/Unit';
import { University } from '../../models/University';
import unitService from '../../services/unit';
import universityService from '../../services/univeristy';
import UnitForm from '../components/forms/UnitForm';
import UniversityForm from '../components/forms/UniversityForm';
import UniversityRow from '../components/university/UniversityRow';

const UniversityPage = () => {
  const [universities, setUniversities] = useState<University[] | null>(null);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState({
    type: 'university',
    universityId: 0,
  });

  const fetchUniveristies = useCallback(async () => {
    const fetchedUniversities = await universityService.getUniversities();
    setUniversities(fetchedUniversities);
  }, []);

  useEffect(() => {
    fetchUniveristies();
  }, [fetchUniveristies]);

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

  const onCreate = (type: string, universityId: number = 0) => {
    setOpen(true);
    setType({
      type: type,
      universityId: universityId,
    });
  };

  const onDelete = async (type: string, id: number) => {
    if (type === 'unit') {
      await unitService.deleteUnit(id);
    } else {
      await universityService.deleteUniversity(id);
    }
    fetchUniveristies();
  };

  const onCreateUniversity = async (data: {}) => {
    setOpen(false);
    await universityService.createUniversity(data);
    fetchUniveristies();
  };

  const onCreateUnit = async (data: {}) => {
    setOpen(false);
    const postUnitData = {
      universityId: type.universityId,
      ...data,
    };
    await unitService.createUnit(postUnitData);
    fetchUniveristies();
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const body = (
    <div className="modal">
      {type.type === 'university' ? (
        <UniversityForm createUniversity={onCreateUniversity} />
      ) : (
        <UnitForm createUnit={onCreateUnit} />
      )}
    </div>
  );

  return (
    <>
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
                <IconButton
                  color="secondary"
                  onClick={() => onCreate('university')}
                >
                  <AddIcon />
                </IconButton>
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
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  );
};

export default UniversityPage;
