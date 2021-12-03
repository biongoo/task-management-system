import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography, Stack, IconButton, Tooltip } from '@mui/material';

const Header = ({ header, subHeader, noBack }) => {
  const { t } = useTranslation();

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={0.5}>
          <Typography variant="h5">{t(header)}</Typography>
          <Typography variant="body2" color="primary.light">
            {t(subHeader)}
          </Typography>
        </Stack>
        {!noBack && (
          <Tooltip title={t('global.back')} arrow>
            <IconButton component={RouterLink} to="/" color="secondary">
              <ArrowBackIcon sx={{ height: '35px', width: '35px' }} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </>
  );
};

export default Header;
