import React from 'react';
import { alpha } from '@mui/material/styles';
import { IconButton as MuiIconButton, Tooltip } from '@mui/material';

const IconButton = ({ tooltip, onClick, open, Icon, defaultSize }) => {
  const size = defaultSize ? defaultSize : 28;

  const body = (
    <MuiIconButton
      onClick={onClick}
      color="secondary"
      sx={{
        padding: 0,
        width: 44,
        height: 44,
        ...(open && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.secondary.main,
              theme.palette.action.focusOpacity
            ),
        }),
      }}
    >
      <Icon
        sx={{
          width: size,
          height: size,
          color: open ? 'secondary.main' : 'primary.light',
        }}
      />
    </MuiIconButton>
  );
  return (
    <>
      {tooltip && (
        <Tooltip title={tooltip} arrow>
          {body}
        </Tooltip>
      )}
      {!tooltip && body}
    </>
  );
};

export default IconButton;
