import React from 'react';
import { InputAdornment } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';

import MainInput from '../UI/Inputs/MainInput';

const Search = ({ search, searchHandler }) => {
  const { t } = useTranslation();

  return (
    <MainInput
      value={search}
      onChange={searchHandler}
      label={t('global.search')}
      sx={{
        '& svg': {
          color: 'primary.light',
          transform: 'rotate(90deg)',
        },
        '& .Mui-focused svg': {
          color: 'secondary.main',
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
