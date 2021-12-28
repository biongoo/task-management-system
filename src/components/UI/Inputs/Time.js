import React from 'react';
import plLocale from 'date-fns/locale/pl';
import enLocale from 'date-fns/locale/en-US';
import TimePicker from '@mui/lab/TimePicker';
import { useTranslation } from 'react-i18next';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Input100Width from './Input100Width';

const localeMap = {
  en: enLocale,
  pl: plLocale,
};

const Time = ({
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

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[actualLanguageId]}
    >
      <TimePicker
        value={value}
        onChange={(newValue) => {
          const event = { target: { value: newValue } };
          onChange(event);
        }}
        disableOpenPicker
        desktopModeMediaQuery=""
        renderInput={(params) => (
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
                color: 'primary.light',
              },
              '& .Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
                color: 'secondary.main',
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default Time;
