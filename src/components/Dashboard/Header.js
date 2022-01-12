import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import TodayIcon from '@mui/icons-material/Today';
import { Stack, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import AddEvent from './AddEvent';
import IconButton from '../UI/Buttons/IconButton';
import { buildFullDate } from '../../utils/formatDate';

const Header = forwardRef(({ currentDate, setDate }, calendar) => {
  const { t, i18n } = useTranslation();
  const actualLanguageId = i18n.language;

  const handleShowToday = () => {
    let calendarApi = calendar.current.getApi();
    calendarApi.today();
    setDate(calendarApi.getDate());
  };

  const handleNext = () => {
    let calendarApi = calendar.current.getApi();
    calendarApi.next();
    setDate(calendarApi.getDate());
  };

  const handlePrev = () => {
    let calendarApi = calendar.current.getApi();
    calendarApi.prev();
    setDate(calendarApi.getDate());
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={{ xs: 0, sm: 2 }}
      mx={{ xs: 0, sm: 2 }}
      mb={2}
    >
      <IconButton
        tooltip={t('dashboard.today')}
        onClick={handleShowToday}
        Icon={TodayIcon}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={{ xs: 0, sm: 1 }}
      >
        <IconButton
          tooltip={t('global.previous')}
          onClick={handlePrev}
          Icon={NavigateBeforeIcon}
        />
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          {buildFullDate(currentDate, actualLanguageId)}
        </Typography>
        <IconButton
          tooltip={t('global.next')}
          onClick={handleNext}
          Icon={NavigateNextIcon}
        />
      </Stack>
      <AddEvent />
    </Stack>
  );
});

export default Header;
