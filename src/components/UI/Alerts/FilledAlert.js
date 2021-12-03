import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
            onClick={
              onCloseAlert ? onCloseAlert : () => window.location.reload(false)
            }
          >
            {onCloseAlert && <CloseIcon fontSize="inherit" />}
            {!onCloseAlert && (
              <IconButton component={RouterLink} to="/signup" color="inherit">
                <ArrowBackIcon />
              </IconButton>
            )}
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
