import React from 'react';
import { AppBar, Toolbar, IconButton, Stack, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { alpha } from '@mui/material/styles';

import Languages from '../Languages';
import Account from './Account';
import Notifications from './Notifications';
import Palette from '../Palette';

const MainLayoutTop = ({ drawerWidth, drawerToggleHandler }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        boxShadow: 6,
        backgroundColor: (theme) => alpha(theme.palette.primary.dark, 0.96),
      }}
    >
      <Toolbar>
        <IconButton
          color="secondary"
          edge="start"
          onClick={drawerToggleHandler}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Empty space to move stack to right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Stack with icons */}
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, md: 1 }}>
          <Languages />
          <Palette drawerWidth={drawerWidth} />
          <Notifications />
          <Account />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default MainLayoutTop;
