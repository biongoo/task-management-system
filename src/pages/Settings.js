import React, { useState } from 'react';
import { red } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import { Box, Stack, Paper, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import IconButton from '../components/UI/Buttons/IconButton';
import ChangePassword from '../components/Settings/ChangePassword';

const Settings = () => {
  const { t } = useTranslation();
  const [showDelete, setShowDelete] = useState(false);

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
          <IconButton
            tooltip={t('settings.delete')}
            onClick={() => setShowDelete((prevState) => !prevState)}
            Icon={DeleteForeverIcon}
            color={red[800]}
            open={showDelete}
            defaultSize={32}
          />
        </Stack>
        <ChangePassword />
      </Paper>
    </Box>
  );
};

export default Settings;
