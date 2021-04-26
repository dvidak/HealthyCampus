import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';

interface Props {
  onEdit: () => void;
}

const EditButton = ({ onEdit }: Props) => (
  <IconButton color="secondary" onClick={onEdit}>
    <EditIcon />
  </IconButton>
);

export default EditButton;
