import React from 'react';
import {
  Stack,
  Dialog as MuiDialog,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import IconButton from '../Buttons/IconButton';
import Divider from '../Dividers/Divider';

const Dialog = ({ open, handleClose, title, body, buttons }) => {
  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      sx={{
        '& .MuiDialog-paper': {
          m: 1,
          boxShadow: 24,
          width: '100%',
          borderRadius: 2,
          maxWidth: '600px',
          '&:focus-visible': {
            outline: 'none',
          },
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        my={2}
        mx={{ xs: 1.5, sm: 2.5 }}
      >
        <Typography variant="h5">{title}</Typography>

        <IconButton onClick={handleClose} Icon={CloseIcon} />
      </Stack>

      <Divider />

      <DialogContent
        sx={{ wordBreak: 'break-all', p: 0, my: 2, mx: { xs: 1.5, sm: 2.5 } }}
      >
        {body}
      </DialogContent>

      {buttons && (
        <>
          <Divider />
          <DialogActions sx={{ py: 2, px: 2.5 }}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              {buttons}
            </Stack>
          </DialogActions>
        </>
      )}
    </MuiDialog>
  );
};

export default Dialog;
