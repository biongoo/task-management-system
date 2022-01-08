import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Stack, Paper, Typography } from '@mui/material';

import DeleteAccount from '../components/Settings/DeleteAccount';
import ChangePassword from '../components/Settings/ChangePassword';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          width: { xs: '95%', md: '95%' },
          maxWidth: '1000px',
          padding: { xs: 2, md: 3.5 },
          bgcolor: 'primary.main',
          boxShadow: 4,
          borderRadius: 4,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 500, fontSize: '1.8rem' }}
            mb={2}
          >
            {t('layout.settings')}
          </Typography>
          <DeleteAccount />
        </Stack>
        <ChangePassword />
      </Paper>
    </Box>
  );
};

export default Settings;
