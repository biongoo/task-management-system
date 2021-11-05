import React from 'react';
import { IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Notifications = () => {
  return (
    <IconButton
      color="secondary"
      sx={{
        padding: 0,
        width: 44,
        height: 44,
      }}
      /* onClick={handleClick} */
      /* sx={{
        ...(open && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
        })
      }} */
    >
      <NotificationsIcon
        sx={{ width: 28, height: 28, color: 'primary.light' }}
      />
    </IconButton>
  );
};

export default Notifications;
