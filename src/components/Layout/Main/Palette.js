import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Divider,
} from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';

const Palette = ({ drawerWidth }) => {
  const { t } = useTranslation();
  const [showPalette, setShowPalette] = useState(false);

  const bgColorOfIcon = showPalette ? 'secondary.main' : 'primary.light';

  const drawer = (
    <>
      <Toolbar />
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" component="div">
          {t('layout.themeSettings')}
        </Typography>
      </Toolbar>
      <Divider
        sx={{
          borderColor: (theme) => alpha(theme.palette.primary.light, 0.24),
        }}
      />
    </>
  );

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

      <Drawer
        anchor={'right'}
        open={showPalette}
        onClose={showPaletteHandler.bind(null, false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            bgcolor: (theme) => alpha(theme.palette.primary.dark, 0.8),
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Palette;
