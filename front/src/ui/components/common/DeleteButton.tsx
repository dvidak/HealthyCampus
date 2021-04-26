import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

interface Props {
  onDelete: () => void;
}

const DeleteButton = ({ onDelete }: Props) => (
  <IconButton color="secondary" onClick={onDelete}>
    <DeleteIcon />
  </IconButton>
);

export default DeleteButton;
