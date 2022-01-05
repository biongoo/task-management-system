import { format } from 'date-fns';
import plLocale from 'date-fns/locale/pl';
import enLocale from 'date-fns/locale/en-US';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TodayIcon from '@mui/icons-material/Today';
import { Stack, Typography } from '@mui/material';
import React, { forwardRef, useEffect, useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import AddEvent from './AddEvent';
import IconButton from '../UI/Buttons/IconButton';

const localeMap = {
  en: enLocale,
  pl: plLocale,
};

const Header = forwardRef(({ refreshPlan }, calendar) => {
  const { t, i18n } = useTranslation();
  const actualLanguageId = i18n.language;
  const [date, setDate] = useState(new Date());
  const matches = useMediaQuery('(min-width:1200px)');

  useEffect(() => {
    if (calendar.current) {
      let calendarApi = calendar.current.getApi();
      calendarApi.changeView(matches ? 'dayGridMonth' : 'listWeek');
      setDate(calendarApi.getDate());
    }
  }, [matches, calendar]);

  const handleShowToday = () => {
    let calendarApi = calendar.current.getApi();
    calendarApi.today();
    setDate(calendarApi.getDate());
    refreshPlan();
  };

  const handleNext = () => {
    let calendarApi = calendar.current.getApi();
    calendarApi.next();
    setDate(calendarApi.getDate());
    refreshPlan();
  };

  const handlePrev = () => {
    let calendarApi = calendar.current.getApi();
    calendarApi.prev();
    setDate(calendarApi.getDate());
    refreshPlan();
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
          {format(date, 'dd MMMM yyyy', {
            locale: localeMap[actualLanguageId],
          })}
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
