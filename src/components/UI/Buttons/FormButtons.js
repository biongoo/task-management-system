import React from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';

export const Add = ({ onClick, loading }) => {
  const { t } = useTranslation();

  return (
    <LoadingButton
      variant="contained"
      color="success"
      sx={{ filter: 'brightness(110%)' }}
      onClick={onClick}
      loading={loading}
    >
      {t('global.add')}
    </LoadingButton>
  );
};

export const Delete = ({ onClick, loading, disabled }) => {
  const { t } = useTranslation();

  return (
    <LoadingButton
      variant="contained"
      color="error"
      sx={{ filter: 'brightness(110%)' }}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
    >
      {t('global.delete')}
    </LoadingButton>
  );
};

export const Edit = ({ onClick, loading }) => {
  const { t } = useTranslation();

  return (
    <LoadingButton
      variant="contained"
      color="success"
      sx={{ filter: 'brightness(110%)' }}
      onClick={onClick}
      loading={loading}
    >
      {t('global.edit')}
    </LoadingButton>
  );
};

export const Cancel = ({ onClick, disabled }) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="contained"
      color="warning"
      sx={{ filter: 'brightness(110%)' }}
      onClick={onClick}
      disabled={disabled}
    >
      {t('global.cancel')}
    </Button>
  );
};
