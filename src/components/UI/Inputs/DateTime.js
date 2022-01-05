import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import plLocale from 'date-fns/locale/pl';
import enLocale from 'date-fns/locale/en-US';
import { useTranslation } from 'react-i18next';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DateTimePicker from '@mui/lab/DateTimePicker';

import Input100Width from './Input100Width';
import darkTheme from '../../../theme/darkMode';
import lightTheme from '../../../theme/lightMode';

const localeMap = {
  en: enLocale,
  pl: plLocale,
};

const maskMap = {
  en: '__/__/____ __:__  _M',
  pl: '__.__.____ __:__',
};

const DateTimeInput = ({
  value,
  onChange,
  label,
  id,
  onBlur,
  error,
  helperText,
  disabled,
  minDateTime,
  maxDateTime,
}) => {
  const { t, i18n } = useTranslation();
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
        <DateTimePicker
          cancelText={t('global.cancel')}
          clearText={t('global.clear')}
          leftArrowButtonText={t('global.previous')}
          rightArrowButtonText={t('global.next')}
          okText={t('global.edit')}
          todayText={t('global.today')}
          toolbarTitle={t('global.selectDateTime')}
          value={value}
          mask={maskMap[actualLanguageId]}
          minDateTime={minDateTime}
          maxDateTime={maxDateTime}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={(newValue) => {
            const event = { target: { value: newValue } };
            onChange(event);
          }}
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

export default DateTimeInput;
