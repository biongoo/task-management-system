import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const LinkButton100Width = ({ to, children }) => {
  return (
    <Button
      component={RouterLink}
      to={to}
      variant="contained"
      size="large"
      sx={{
        width: '100%',
        borderRadius: (theme) => `${theme.shape.borderRadius * 2}px`,
        '&.MuiButton-root:hover': {
          bgcolor: 'secondary.main',
          filter: 'brightness(90%)',
        },
      }}
      color="secondary"
    >
      {children}
    </Button>
  );
};

export default LinkButton100Width;
