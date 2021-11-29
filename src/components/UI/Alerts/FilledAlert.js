import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Collapse, Alert, AlertTitle } from '@mui/material';

const FilledAlert = ({ show, severity, title, message, onCloseAlert }) => {
  return (
    <Collapse in={show}>
      <Alert
        variant="filled"
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onCloseAlert}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Collapse>
  );
};

export default FilledAlert;
