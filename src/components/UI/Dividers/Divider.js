import React from 'react';
import { alpha } from '@mui/material/styles';
import { Divider as MuiDivider } from '@mui/material';

const Divider = ({ mb }) => {
  return (
    <MuiDivider
      sx={{
        borderColor: (theme) => alpha(theme.palette.primary.light, 0.4),
        mb: mb,
      }}
    />
  );
};

export default Divider;
