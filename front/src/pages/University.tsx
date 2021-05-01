import { createStyles, makeStyles, Modal, Theme } from '@material-ui/core';
import { default as React, useCallback, useEffect, useState } from 'react';
import UnitForm from '../components/university/UnitForm';
import UniversityForm from '../components/university/UniversityForm';
import UniversityTable from '../components/university/UniversityTable';
import { RowType, UpdateUnitData } from '../models/Unit';
import { University } from '../models/University';
import unitService from '../services/unit';
import universityService from '../services/univeristy';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 300,
      flexGrow: 1,
      minWidth: 300,
    },
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
      border: '2px solid #2c8c99',
      borderRadius: '20px',
    },
  }),
);

const UniversityPage = () => {
  const classes = useStyles();
  const [universities, setUniversities] = useState<University[] | null>(null);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState({
    type: RowType.university,
    universityId: 0,
  });

  const fetchUniveristies = useCallback(async () => {
    const fetchedUniversities = await universityService.getUniversities();
    setUniversities(fetchedUniversities);
  }, []);

  useEffect(() => {
    fetchUniveristies();
  }, [fetchUniveristies]);

  const onSave = async (
    universityId: number,
    name: string,
    type: RowType,
    unitId?: number,
  ) => {
    let response;

    if (type === RowType.unit && unitId) {
      const updateUnitData: UpdateUnitData = {
        universityId,
        unitId,
        name,
      };

      response = await unitService.updateUnit(updateUnitData);
    } else {
      const updateUniversityData: any = {
        universityId,
        name,
      };
      response = await universityService.updateUniversity(updateUniversityData);
    }

    if (response.statusCode === 204) {
      fetchUniveristies();
    }
  };

  const onCreate = (type: RowType, universityId: number = 0) => {
    setOpen(true);
    setType({
      type: type,
      universityId: universityId,
    });
  };

  const onDelete = async (type: RowType, id: number) => {
    let response;

    if (type === RowType.unit) {
      response = await unitService.deleteUnit(id);
    } else {
      response = await universityService.deleteUniversity(id);
    }

    if (response.statusCode !== 204) {
      alert(response.message);
    } else {
      fetchUniveristies();
    }
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
      {type.type === RowType.university ? (
        <UniversityForm createUniversity={onCreateUniversity} />
      ) : (
        <UnitForm createUnit={onCreateUnit} />
      )}
    </div>
  );

  return (
    <>
      <UniversityTable
        universities={universities}
        onCreate={onCreate}
        onDelete={onDelete}
        onSave={onSave}
      ></UniversityTable>
      <Modal
        className={classes.modal}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>{body}</div>
      </Modal>
    </>
  );
};

export default UniversityPage;
