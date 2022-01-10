import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import { MenuItem, ListItemIcon, Box, Button } from '@mui/material';

import { startLogout } from '../../../store/auth-slice';
import { showSnackbar } from '../../../store/palette-slice';

const MENU_OPTIONS = [
  {
    label: 'layout.settings',
    icon: <SettingsIcon />,
    linkTo: '/dashboard/settings',
  },
];

const AccountItems = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(startLogout());
    dispatch(
      showSnackbar({
        message: t('login.successLogout'),
        variant: 'success',
      })
    );
  };

  return (
    <>
      {MENU_OPTIONS.map((item) => (
        <MenuItem
          key={item.label}
          onClick={handleClose}
          component={NavLink}
          to={item.linkTo}
        >
          <ListItemIcon sx={{ color: 'primary.light' }}>
            {item.icon}
          </ListItemIcon>
          {t(item.label)}
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
          {t('layout.logout')}
        </Button>
      </Box>
    </>
  );
};

export default AccountItems;
