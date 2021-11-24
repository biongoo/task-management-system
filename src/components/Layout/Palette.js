import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PaletteContent from './PaletteContent';

const Palette = ({ drawerWidth }) => {
  const [showPalette, setShowPalette] = useState(false);

  const bgColorOfIcon = showPalette ? 'secondary.main' : 'primary.light';

  const showPaletteHandler = (arg) => {
    setShowPalette(arg);
  };

  return (
    <>
      <IconButton
        color="secondary"
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(showPalette && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.secondary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
        onClick={showPaletteHandler.bind(null, true)}
      >
        <ColorLensIcon
          sx={{
            width: 28,
            height: 28,
            color: bgColorOfIcon,
          }}
        />
      </IconButton>

      <PaletteContent
        showPalette={showPalette}
        showPaletteHandler={showPaletteHandler}
        drawerWidth={drawerWidth}
      />
    </>
  );
};

export default Palette;
