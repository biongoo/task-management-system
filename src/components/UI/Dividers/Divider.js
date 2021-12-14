import React from 'react';
import { alpha } from '@mui/material/styles';
import { Divider as MuiDivider } from '@mui/material';

const Divider = () => {
  return (
    <MuiDivider
      sx={{
        borderColor: (theme) => alpha(theme.palette.primary.light, 0.4),
      }}
    />
  );
};

export default Divider;
