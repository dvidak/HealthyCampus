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
import { University } from '../../../models/University';
import CancelButton from '../common/CancelButton';
import CreateButton from '../common/CreateButton';
import DeleteButton from '../common/DeleteButton';
import EditButton from '../common/EditButton';
import SaveButton from '../common/SaveButton';

interface Props {
  row: University;
  onSaveRow: (universityId: number, unitId: number, name: string) => void;
  onCreate: (type: string, universityId?: number) => void;
  onDelete: (type: string, id: number) => void;
}

const UniversityRow = ({ row, onSaveRow, onCreate, onDelete }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState<string | undefined>();

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const onEditUnit = ({ id, currentName }: any) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setName(currentName);
  };

  const onSaveUnit = ({ universityId, unitId, newName }: any) => {
    onSaveRow(universityId, unitId, newName);
    setName(newName);
    setInEditMode({
      status: false,
      rowKey: null,
    });
  };

  const onCancelUnit = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
    setName(undefined);
  };

  return (
    <>
      <TableRow className="table-row">
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell align="right">
          <DeleteButton onDelete={() => onDelete('university', row.id)} />
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
                      <CreateButton onCreate={() => onCreate('unit', row.id)} />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.units.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell>
                        {inEditMode.status && inEditMode.rowKey === unit.id ? (
                          <Input
                            color="secondary"
                            fullWidth
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                        ) : (
                          unit.name
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {inEditMode.status && inEditMode.rowKey === unit.id ? (
                          <>
                            <SaveButton
                              onSave={() =>
                                onSaveUnit({
                                  universityId: row.id,
                                  unitId: unit.id,
                                  newName: name,
                                })
                              }
                            />
                            <CancelButton onCancel={onCancelUnit} />
                          </>
                        ) : (
                          <>
                            <EditButton
                              onEdit={() =>
                                onEditUnit({
                                  id: unit.id,
                                  currentName: unit.name,
                                })
                              }
                            />
                            <DeleteButton
                              onDelete={() => onDelete('unit', unit.id)}
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
