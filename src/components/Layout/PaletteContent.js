import React from 'react';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Drawer, Toolbar, Typography, Divider, Box } from '@mui/material';

import PaletteContentMode from './PaletteContentMode';
import PaletteContentColor from './PaletteContentColor';

const PaletteContent = ({ showPalette, showPaletteHandler, drawerWidth }) => {
  const { t } = useTranslation();

  const drawer = (
    <>
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

      <Box m={3}>
        <PaletteContentMode />
        <PaletteContentColor />
      </Box>
    </>
  );

  return (
    <Drawer
      anchor={'right'}
      open={showPalette}
      onClose={showPaletteHandler.bind(null, false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          marginTop: '10px',
          height: `calc(100% - 20px)`,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.95),
          borderRadius: 3,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default PaletteContent;
