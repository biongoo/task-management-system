import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';

import MainLayoutTop from './MainLayoutTop';
import MainLayoutLeft from './MainLayoutLeft';

const drawerWidth = 240;

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerToggleHandler = () => {
    setMobileOpen(!mobileOpen);
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {<Outlet />}
      </Box>
    </Box>
  );
};

export default MainLayout;
