import React from 'react';
import Lottie from 'lottie-react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';

import animation404 from '../assets/404.json';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        bgcolor: 'primary.dark',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Lottie animationData={animation404} style={{ width: '400px' }} />
      <Typography variant="h6">
        {t('layout.back')}{' '}
        <Link component={RouterLink} to="/" variant="h6" color="secondary">
          {t('layout.homepage')}
        </Link>
        .
      </Typography>
    </Box>
  );
};

export default NotFound;
