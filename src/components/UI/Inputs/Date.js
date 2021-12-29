import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import plLocale from 'date-fns/locale/pl';
import enLocale from 'date-fns/locale/en-US';
import { useTranslation } from 'react-i18next';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Input100Width from './Input100Width';
import darkTheme from '../../../theme/darkMode';
import lightTheme from '../../../theme/lightMode';

const localeMap = {
  en: enLocale,
  pl: plLocale,
};

const maskMap = {
  en: '__/__/____',
  pl: '__.__.____',
};

const DateInput = ({
  value,
  onChange,
  label,
  id,
  onBlur,
  error,
  helperText,
  disabled,
}) => {
  const { i18n } = useTranslation();
  const actualLanguageId = i18n.language;
  const [open, setOpen] = useState(false);
  const paletteMode = useSelector((state) => state.palette.mode);
  const paletteColor = useSelector((state) => state.palette.color);

  const themeMain = createTheme(
    paletteMode === 'light' ? lightTheme : darkTheme,
    { palette: { secondary: { main: paletteColor } } }
  );

  const theme = createTheme({
    palette: {
      ...themeMain.palette,
      primary: {
        main: paletteColor,
        light: paletteColor,
        dark: paletteColor,
      },
      action: {
        active: paletteColor,
      },
    },
  });

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[actualLanguageId]}
    >
      <ThemeProvider theme={theme}>
        <DesktopDatePicker
          mask={maskMap[actualLanguageId]}
          value={value}
          onChange={(newValue) => {
            const event = { target: { value: newValue } };
            onChange(event);
          }}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          renderInput={(params) => (
            <ThemeProvider theme={themeMain}>
              <Input100Width
                {...params}
                label={label}
                id={id}
                onBlur={onBlur}
                error={error}
                helperText={helperText}
                disabled={disabled}
                sx={{
                  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                    color: open ? 'secondary.main' : 'primary.light',
                  },
                }}
              />
            </ThemeProvider>
          )}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default DateInput;
