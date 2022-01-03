import React from 'react';
import { alpha } from '@mui/material/styles';
import { IconButton as MuiIconButton, Tooltip } from '@mui/material';

const IconButton = ({
  tooltip,
  onClick,
  open,
  Icon,
  defaultSize,
  circleSize,
  edge,
  placement,
}) => {
  const size = defaultSize ? defaultSize : 28;
  const placementPosition = placement ? placement : 'bottom';

  const body = (
    <MuiIconButton
      onClick={onClick}
      color="secondary"
      edge={edge}
      sx={{
        padding: 0,
        width: circleSize ? circleSize : 44,
        height: circleSize ? circleSize : 44,
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
        <Tooltip title={tooltip} placement={placementPosition} arrow>
          {body}
        </Tooltip>
      )}
      {!tooltip && body}
    </>
  );
};

export default IconButton;
