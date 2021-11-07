import React from 'react';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  Toolbar,
  Typography,
  Divider,
  Box,
  Stack,
  Button,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const PaletteContent = ({ showPalette, showPaletteHandler, drawerWidth }) => {
  const { t } = useTranslation();

  const colors1 = ['green', 'purple', 'light-blue'];
  const colors2 = ['blue', 'orange', 'red'];

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
        <Typography variant="subtitle2">{t('layout.mode')}</Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          mt={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Button
            sx={{
              width: 88,
              height: 88,
              boxShadow: 12,
              bgcolor: 'palettebg.light',
              '&.MuiButton-root:hover': {
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.3),
              },
            }}
            color="secondary"
          >
            <LightModeIcon
              sx={{
                width: 28,
                height: 28,
              }}
            />
          </Button>

          <Button
            sx={{
              width: 88,
              height: 88,
              bgcolor: 'palettebg.dark',
              boxShadow: 12,
              '&.MuiButton-root:hover': {
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.3),
              },
            }}
            color="secondary"
          >
            <DarkModeIcon
              sx={{
                width: 28,
                height: 28,
              }}
            />
          </Button>
        </Stack>

        <Typography variant="subtitle2" mt={4}>
          {t('layout.color')}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          mt={2}
          sx={{ justifyContent: 'space-between' }}
        >
          {colors1.map((color) => {
            return (
              <Button variant="outlined" color="secondary">
                <FiberManualRecordIcon
                  sx={{
                    width: 28,
                    height: 28,
                  }}
                />
              </Button>
            );
          })}
        </Stack>
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
          marginTop: (theme) => `${theme.mixins.toolbar.minHeight}px`,
          height: (theme) =>
            `calc(100% - ${theme.mixins.toolbar.minHeight * 2}px)`,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.9),
          borderRadius: 3,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default PaletteContent;
