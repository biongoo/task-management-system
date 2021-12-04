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
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {isLoggedIn ? <Outlet /> : <Navigate to="/" />}
      </Box>
    </Box>
  );
};

export default MainLayout;
