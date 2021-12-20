import React from 'react';
import { useSelector } from 'react-redux';
import Popper from '@mui/material/Popper';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Highlighter from 'react-highlight-words';
import MuiAutocomplete, {
  autocompleteClasses,
} from '@mui/material/Autocomplete';

import Input100Width from './Input100Width';

const StyledPopper = styled(Popper)(({ theme }) => ({
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.primary.dark,
    '& li.MuiAutocomplete-option:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '& li.MuiAutocomplete-option[aria-selected="true"]': {
      backgroundColor: theme.palette.action.selected,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
}));

const Autocomplete = ({
  value,
  onChange,
  options,
  label,
  id,
  onBlur,
  error,
  helperText,
  disabled,
}) => {
  const { t } = useTranslation();
  const paletteColor = useSelector((state) => state.palette.color);

  return (
    <MuiAutocomplete
      value={value}
      autoHighlight
      PopperComponent={StyledPopper}
      onChange={(_, newValue) => {
        const event = { target: { value: newValue } };
        onChange(event);
      }}
      clearText={t('layout.clear')}
      openText={t('layout.open')}
      closeText={t('layout.close')}
      noOptionsText={t('layout.noOptions')}
      sx={{
        '& .MuiAutocomplete-endAdornment .MuiSvgIcon-root': {
          color: 'primary.light',
        },
        '&.Mui-focused .MuiAutocomplete-endAdornment .MuiSvgIcon-root': {
          color: 'secondary.main',
        },
      }}
      options={options}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <Input100Width
          {...params}
          label={label}
          id={id}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          disabled={disabled}
        />
      )}
      renderOption={(props, option, { inputValue }) => (
        <li {...props}>
          <div>
            <Highlighter
              searchWords={[inputValue]}
              highlightStyle={{
                color: paletteColor,
                backgroundColor: 'inherit',
              }}
              textToHighlight={`${option.label}`}
            />
          </div>
        </li>
      )}
    />
  );
};

export default Autocomplete;
