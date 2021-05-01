import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

interface Props {
  onCreate: () => void;
}

const CreateButton = ({ onCreate }: Props) => (
  <IconButton color="secondary" onClick={onCreate}>
    <AddIcon />
  </IconButton>
);

export default CreateButton;
