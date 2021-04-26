import { IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';

interface Props {
  onSave: () => void;
}

const SaveButton = ({ onSave }: Props) => (
  <IconButton color="secondary" onClick={onSave}>
    <SaveIcon />
  </IconButton>
);

export default SaveButton;
