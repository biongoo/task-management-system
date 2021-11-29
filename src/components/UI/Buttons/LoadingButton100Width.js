import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const LoadingButton100Width = ({ onClick, loading, children }) => {
  return (
    <LoadingButton
      variant="contained"
      size="large"
      sx={{
        width: '100%',
        borderRadius: (theme) => `${theme.shape.borderRadius * 2}px`,
        '&.MuiButton-root:hover': {
          bgcolor: 'secondary.main',
          filter: 'brightness(90%)',
        },
        '&.MuiLoadingButton-loading': {
          bgcolor: 'primary.light',
          filter: 'brightness(120%)',
          '& .MuiLoadingButton-loadingIndicator': {
            color: 'primary.main',
          },
        },
      }}
      color="secondary"
      onClick={onClick}
      loading={loading}
    >
      {children}
    </LoadingButton>
  );
};

export default LoadingButton100Width;
