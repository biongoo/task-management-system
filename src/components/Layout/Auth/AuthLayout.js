import React, { useRef, useEffect } from 'react';
import Lottie from 'lottie-web';
import { colorify, getColors, replaceColor } from 'lottie-colorify';
/* import Lottie from 'lottie-react'; */
import monster from './monster.json';
import monster2 from './monster2.json';
import monster1 from './monster.json';
import { Outlet } from 'react-router-dom';
import { Box, Paper, Grid } from '@mui/material';

const minLogoWidth = 450;

const AuthLayout = () => {
  const container = useRef(null);
  console.log(getColors(monster));

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      animationData: replaceColor('#000000', '#ffffff', monster),
    });
  }, []);

  return (
    <>
      {/* <Grid
        container
        sx={{
          height: '100vh',
          alignContent: 'center',
          display: { xs: 'none', md: 'flex' },
        }}
        p={3}
      >
        <Grid item xs={8}>
          <Paper sx={{ height: '100vh' }}>xs=8</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>xs=4</Paper>
        </Grid>
      </Grid> */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexWrap: 'wrap',
          alignContent: 'center',
          bgcolor: 'background.paper',
          height: '100vh',
        }}
      >
        <Box sx={{ minWidth: minLogoWidth, height: '100%' }} p={3}>
          <Paper sx={{ width: '100%', height: '100%', boxShadow: 4 }}>
            {/* <Lottie
              animationData={monster}
              style={{ width: '300px', color: '#000' }}
              colors={{ primary: '#000' }}
            /> */}
            <div className="LottieContainer" ref={container} />
          </Paper>
        </Box>
        <Box p={2} sx={{ width: '50%', height: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AuthLayout;
