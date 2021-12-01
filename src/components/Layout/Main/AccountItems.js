import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch } from 'react-redux';
import { MenuItem, ListItemIcon, Box, Button } from '@mui/material';

import { logout } from '../../../store/auth-slice';

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: <HomeIcon />,
    linkTo: '/dashboard',
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    linkTo: '/dashboard/settings',
  },
];

const AccountItems = ({ handleClose }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      {MENU_OPTIONS.map((item) => (
        <MenuItem key={item.label} onClick={handleClose}>
          <ListItemIcon sx={{ color: 'primary.light' }}>
            {item.icon}
          </ListItemIcon>
          {item.label}
        </MenuItem>
      ))}
      <Box sx={{ px: 2, pt: 1 }}>
        <Button
          fullWidth
          color="inherit"
          sx={{ borderColor: 'primary.light' }}
          variant="outlined"
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </Box>
    </>
  );
};

export default AccountItems;
