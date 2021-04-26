import { Modal } from '@material-ui/core';
import { default as React, useCallback, useEffect, useState } from 'react';
import { RowType, UpdateUnitData } from '../../models/Unit';
import { University } from '../../models/University';
import unitService from '../../services/unit';
import universityService from '../../services/univeristy';
import UnitForm from '../components/forms/UnitForm';
import UniversityForm from '../components/forms/UniversityForm';
import UniversityTable from '../components/university/UniversityTable';

const UniversityPage = () => {
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
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  );
};

export default UniversityPage;
