import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Paper, Stack } from '@mui/material';
import { Outlet, Navigate } from 'react-router-dom';

import Languages from '../Languages';
import Palette from '../Palette';
import Animation from './Animation';
import Snackbar from '../Snackbar';

const minLogoWidth = 350;
const drawerWidth = 240;
const heightNavbar = 44;
const maxInputWidth = 480;

const AuthLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        height: '100vh',
      }}
    >
      <Snackbar />
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          minWidth: minLogoWidth,
          width: '30%',
          height: '100%',
        }}
        py={2}
        pl={2}
      >
        <Paper
          sx={{
            width: '100%',
            height: '100%',
            boxShadow: 4,
            borderRadius: 5,
            '&.MuiPaper-root': { bgcolor: 'palette.main' },
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Animation />
        </Paper>
      </Box>

      <Box
        p={2}
        sx={{
          display: 'flex',
          height: '100%',
          flexGrow: 1,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: heightNavbar,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={{ xs: 0, md: 1 }}>
            <Languages />
            <Palette drawerWidth={drawerWidth} />
          </Stack>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: maxInputWidth }}>
            {!isLoggedIn ? <Outlet /> : <Navigate to="/dashboard" />}
          </Box>
        </Box>
        <Box sx={{ height: heightNavbar }}></Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
