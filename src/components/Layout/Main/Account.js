import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import {
  Avatar,
  IconButton,
  Menu,
  Box,
  Typography,
  Divider,
} from '@mui/material';

import AccountItems from './AccountItems';

const Account = () => {
  const email = useSelector((state) => state.auth.email);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        color="secondary"
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.secondary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Avatar sx={{ bgcolor: 'secondary.main', width: 28, height: 28 }}>
          {email.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiPaper-root': { width: 220 } }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {email}
          </Typography>
        </Box>
        <Divider
          sx={{
            '&.MuiDivider-root': {
              borderColor: (theme) => alpha(theme.palette.primary.light, 0.4),
            },
          }}
        />
        <Box sx={{ my: 1 }}>{<AccountItems handleClose={handleClose} />}</Box>
      </Menu>
    </>
  );
};

export default Account;
