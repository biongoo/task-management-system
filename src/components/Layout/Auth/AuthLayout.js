import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const AuthLayout = () => {
  return (
    <Box component="main" sx={{ display: 'flex' }}>
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
