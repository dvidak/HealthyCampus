import {
  Box,
  Collapse,
  IconButton,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { default as React, useState } from 'react';
import { RowType } from '../../models/Unit';
import { University } from '../../models/University';
import CancelButton from '../common/CancelButton';
import CreateButton from '../common/CreateButton';
import DeleteButton from '../common/DeleteButton';
import EditButton from '../common/EditButton';
import SaveButton from '../common/SaveButton';

interface Props {
  row: University;
  onSaveRow: (
    universityId: number,
    name: string,
    type: RowType,
    unitId?: number,
  ) => void;
  onCreate: (type: RowType, universityId?: number) => void;
  onDelete: (type: RowType, id: number) => void;
}

const UniversityRow = ({ row, onSaveRow, onCreate, onDelete }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [uniName, setUniName] = useState<string | undefined>();
  const [unitName, setUnitName] = useState<string | undefined>();

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
    type: null,
  });

  const onEdit = ({ id, currentName, type }: any) => {
    setInEditMode({
      status: true,
      rowKey: id,
      type: type,
    });

    if (type === RowType.unit) {
      setUnitName(currentName);
    } else {
      setUniName(currentName);
    }
  };

  const onSave = ({ universityId, unitId, newName, type }: any) => {
    onSaveRow(universityId, newName, type, unitId);
    setInEditMode({
      status: false,
      rowKey: null,
      type: null,
    });

    if (type === RowType.unit) {
      setUnitName(newName);
    } else {
      setUniName(newName);
    }
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
      type: null,
    });
    setUnitName(undefined);
  };

  return (
    <>
      <TableRow className="table-row">
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">
          {inEditMode.status &&
          inEditMode.type === RowType.university &&
          inEditMode.rowKey === row.id ? (
            <Input
              color="secondary"
              fullWidth
              value={uniName}
              onChange={(event) => setUniName(event.target.value)}
            />
          ) : (
            row.name
          )}
        </TableCell>
        <TableCell align="right">
          {inEditMode.status &&
          inEditMode.type === RowType.university &&
          inEditMode.rowKey === row.id ? (
            <>
              <SaveButton
                onSave={() =>
                  onSave({
                    universityId: row.id,
                    newName: uniName,
                    type: RowType.university,
                  })
                }
              />
              <CancelButton onCancel={onCancel} />
            </>
          ) : (
            <>
              <EditButton
                onEdit={() =>
                  onEdit({
                    id: row.id,
                    currentName: row.name,
                    type: RowType.university,
                  })
                }
              />
              <DeleteButton
                onDelete={() => onDelete(RowType.university, row.id)}
              />
            </>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open}>
            <Box margin={1}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography color="secondary">Units</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <CreateButton
                        onCreate={() => onCreate(RowType.unit, row.id)}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.units.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell>
                        {inEditMode.status &&
                        inEditMode.type === RowType.unit &&
                        inEditMode.rowKey === unit.id ? (
                          <Input
                            color="secondary"
                            fullWidth
                            value={unitName}
                            onChange={(event) =>
                              setUnitName(event.target.value)
                            }
                          />
                        ) : (
                          unit.name
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {inEditMode.status &&
                        inEditMode.type === RowType.unit &&
                        inEditMode.rowKey === unit.id ? (
                          <>
                            <SaveButton
                              onSave={() =>
                                onSave({
                                  universityId: row.id,
                                  unitId: unit.id,
                                  newName: unitName,
                                  type: RowType.unit,
                                })
                              }
                            />
                            <CancelButton onCancel={onCancel} />
                          </>
                        ) : (
                          <>
                            <EditButton
                              onEdit={() =>
                                onEdit({
                                  id: unit.id,
                                  currentName: unit.name,
                                  type: RowType.unit,
                                })
                              }
                            />
                            <DeleteButton
                              onDelete={() => onDelete(RowType.unit, unit.id)}
                            />
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UniversityRow;
