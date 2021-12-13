import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Toolbar } from '@mui/material';
import { Outlet, Navigate } from 'react-router-dom';

import MainLayoutTop from './MainLayoutTop';
import MainLayoutLeft from './MainLayoutLeft';
import Snackbar from '../Snackbar';

const drawerWidth = 240;

const MainLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerToggleHandler = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <MainLayoutTop
        drawerWidth={drawerWidth}
        drawerToggleHandler={drawerToggleHandler}
      />

      <MainLayoutLeft
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        drawerToggleHandler={drawerToggleHandler}
      />

      <Snackbar />

      <Box
        component="main"
        sx={{
          margin: 'auto',
          py: { xs: 2, sm: 4 },
          px: { xs: 0, sm: 2 },
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {isLoggedIn ? <Outlet /> : <Navigate to="/" />}
      </Box>
    </Box>
  );
};

export default MainLayout;
