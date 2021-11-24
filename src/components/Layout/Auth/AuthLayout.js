import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Paper, Stack } from '@mui/material';

import Languages from '../Languages';
import Palette from '../Palette';
import Animation from './Animation';

const minLogoWidth = 400;
const drawerWidth = 240;
const heightNavbar = 44;
const maxInputWidth = 480;

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        bgcolor: 'palette.dark',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          minWidth: minLogoWidth,
          width: '30%',
          height: '100%',
        }}
        p={2}
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

      <Box p={2} sx={{ height: '100%', flexGrow: 1 }}>
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
            height: `calc(100% - ${heightNavbar}px)`,
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: maxInputWidth }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
