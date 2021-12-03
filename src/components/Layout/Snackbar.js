import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar as SnackbarMUI } from '@mui/material/';
import Alert from '@mui/material/Alert';

import { hideSnackbar } from '../../store/palette-slice';

const Snackbar = () => {
  const dispatch = useDispatch();
  const { message, variant, time, show } = useSelector(
    (state) => state.palette.snackbar
  );

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <SnackbarMUI
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={show}
      autoHideDuration={time ? time : 6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={variant} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </SnackbarMUI>
  );
};

export default Snackbar;
