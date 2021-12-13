import React from 'react';
import { alpha } from '@mui/material/styles';
import {
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const styleModal = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%' },
  maxWidth: '600px',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  '&:focus-visible': {
    outline: 'none',
  },
};

const MainModal = ({ open, handleClose, title, body, buttons }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={styleModal}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            my={2}
            mx={2.5}
          >
            <Typography variant="h5">{title}</Typography>

            <IconButton
              onClick={handleClose}
              color="secondary"
              sx={{
                padding: 0,
                width: 44,
                height: 44,
              }}
            >
              <CloseIcon
                sx={{
                  width: 28,
                  height: 28,
                  color: 'primary.light',
                }}
              />
            </IconButton>
          </Stack>

          <Divider
            sx={{
              borderColor: (theme) => alpha(theme.palette.primary.light, 0.4),
            }}
          />

          <Box my={2} mx={2.5}>
            {body}
          </Box>

          <Divider
            sx={{
              borderColor: (theme) => alpha(theme.palette.primary.light, 0.4),
            }}
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            my={2}
            mx={2.5}
          >
            {buttons}
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MainModal;
