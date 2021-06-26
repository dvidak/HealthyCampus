import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react';

interface Props {
  onCancel: () => void;
}

const CancelButton = ({ onCancel }: Props) => (
  <IconButton onClick={onCancel}>
    <ClearIcon />
  </IconButton>
);

export default CancelButton;
