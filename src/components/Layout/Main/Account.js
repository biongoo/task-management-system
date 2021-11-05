import React from 'react';
import { Avatar, IconButton } from '@mui/material';

const Account = () => {
  return (
    <IconButton
      /* ref={anchorRef}
        onClick={handleOpen} */
      color="secondary"
      sx={{
        padding: 0,
        width: 44,
        height: 44,
        /*           ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          }) */
      }}
    >
      <Avatar sx={{ bgcolor: 'secondary.main', width: 28, height: 28 }}>
        L
      </Avatar>
    </IconButton>
  );
};

export default Account;
