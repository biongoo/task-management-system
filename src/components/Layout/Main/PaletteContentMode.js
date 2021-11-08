import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeMode } from '../../../store/palette-slice';
import { useTranslation } from 'react-i18next';
import { Stack, Button, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const PaletteContentMode = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const paletteMode = useSelector((state) => state.palette.mode);

  const changeModeHandler = (mode) => {
    localStorage.setItem('mode', mode);
    dispatch(changeMode(mode));
  };

  return (
    <>
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
          color={paletteMode === 'light' ? 'secondary' : 'primary'}
          onClick={() => changeModeHandler('light')}
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
          color={paletteMode === 'dark' ? 'secondary' : 'primary'}
          onClick={() => changeModeHandler('dark')}
          selected={true}
        >
          <DarkModeIcon
            sx={{
              width: 28,
              height: 28,
            }}
          />
        </Button>
      </Stack>
    </>
  );
};

export default PaletteContentMode;
