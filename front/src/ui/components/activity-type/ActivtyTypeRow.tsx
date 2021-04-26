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
import { ActivityType } from '../../../models/ActivityType';
import CancelButton from '../common/CancelButton';
import CreateButton from '../common/CreateButton';
import DeleteButton from '../common/DeleteButton';
import EditButton from '../common/EditButton';
import SaveButton from '../common/SaveButton';

interface Props {
  type: string;
  activitySubtypes: ActivityType[] | null;
  onCreate: () => void;
  onDelete: (id: any) => void;
}

const ActivityTypeRow = ({
  type,
  activitySubtypes,
  onCreate,
  onDelete,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
    type: null,
  });

  const onEdit = (id: any) => {
    setInEditMode({
      status: true,
      rowKey: id,
      type: null,
    });
  };

  const onSave = () => {
    setInEditMode({
      status: false,
      rowKey: null,
      type: null,
    });
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
      type: null,
    });
  };

  return (
    <>
      <TableRow className="table-row" key={type}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">
          {inEditMode.status && inEditMode.rowKey === type ? (
            <Input color="secondary" fullWidth />
          ) : (
            type
          )}
        </TableCell>
        <TableCell align="right">
          {inEditMode.status && inEditMode.rowKey === type ? (
            <>
              <SaveButton onSave={() => onSave()} />
              <CancelButton onCancel={onCancel} />
            </>
          ) : (
            <>
              <EditButton onEdit={() => onEdit(type)} />
              <DeleteButton onDelete={() => onDelete(type)} />
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
                      <Typography color="secondary">Subtypes</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <CreateButton onCreate={() => onCreate()} />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activitySubtypes &&
                    activitySubtypes.map((at: ActivityType) => (
                      <TableRow>
                        <TableCell>
                          {inEditMode.status && inEditMode.rowKey === at.id ? (
                            <Input color="secondary" fullWidth />
                          ) : (
                            at.subType
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {inEditMode.status && inEditMode.rowKey === at.id ? (
                            <>
                              <SaveButton onSave={() => onSave()} />
                              <CancelButton onCancel={onCancel} />
                            </>
                          ) : (
                            <>
                              <EditButton onEdit={() => onEdit(at.id)} />
                              <DeleteButton onDelete={() => onDelete(at.id)} />
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

export default ActivityTypeRow;
