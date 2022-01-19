import { alpha } from '@mui/material/styles';
import FullCalendar from '@fullcalendar/react';
import { useTranslation } from 'react-i18next';
import React, { forwardRef, useEffect } from 'react';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import { Box, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';

import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import { buildTime } from '../../utils/formatDate';
import plLocale from '@fullcalendar/core/locales/pl';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = forwardRef(({ events }, calendar) => {
  const { i18n } = useTranslation();
  const matches = useMediaQuery('(min-width:1200px)');

  useEffect(() => {
    if (calendar.current) {
      let calendarApi = calendar.current.getApi();
      calendarApi.changeView(matches ? 'dayGridMonth' : 'listWeek');
    }
  }, [matches, calendar]);

  return (
    <Box sx={sxCalendar}>
      <FullCalendar
        ref={calendar}
        locales={[plLocale]}
        locale={i18n.language}
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        initialView={'dayGridMonth'}
        dayMaxEventRows={3}
        eventContent={renderEventContent}
        weekNumberContent={renderWeekNumberContent}
        contentHeight={'auto'}
        eventOrder={'priority,start'}
        weekNumbers={true}
        headerToolbar={{
          left: '',
          center: '',
          right: '',
        }}
        events={events}
      />
    </Box>
  );
});

const renderEventContent = (eventInfo) => {
  let startTime = eventInfo.event.start;
  let endTime = eventInfo.event.end;
  let onlyDeadline = eventInfo.event.extendedProps.onlyDeadline;
  let onClick = eventInfo.event.extendedProps.onClick;

  const startTimeString = buildTime(
    startTime,
    eventInfo.view.dateEnv.locale.codeArg
  );
  const endTimeString = buildTime(
    endTime,
    eventInfo.view.dateEnv.locale.codeArg
  );

  const phoneText = (
    <Typography
      variant="body2"
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        px: 0.5,
      }}
    >
      {eventInfo.startTimeString}
      {eventInfo.event.extendedProps.title2}
    </Typography>
  );

  const normalText = (
    <Typography
      variant="body2"
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        px: 0.5,
        color: 'text.primary',
      }}
    >
      <span style={{ fontWeight: 500 }}>{startTimeString} </span>
      {eventInfo.event.title}
    </Typography>
  );

  const body =
    eventInfo.view.type === 'listWeek' ? (
      <>
        {onClick && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            onClick={onClick}
          >
            {phoneText}
            <InfoIcon sx={{ fontSize: '1.1rem', color: 'text.primary' }} />
          </Stack>
        )}
        {!onClick && phoneText}
      </>
    ) : (
      <>
        {onClick && (
          <Tooltip
            title={
              <>
                <Typography variant="body1">
                  {startTimeString} {!onlyDeadline && <>- {endTimeString}</>}
                </Typography>
                <Typography variant="body2">
                  {eventInfo.event.extendedProps.title2}
                </Typography>
              </>
            }
            placement="right"
            arrow
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={0}
              onClick={onClick}
              sx={{ width: '100%' }}
            >
              {normalText}
              <InfoIcon
                sx={{
                  fontSize: '1.1rem',
                  marginRight: '2px',
                  color: 'text.primary',
                }}
              />
            </Stack>
          </Tooltip>
        )}
        {!onClick && (
          <Tooltip
            title={
              <>
                <Typography variant="body1">
                  {startTimeString} {!onlyDeadline && <>- {endTimeString}</>}
                </Typography>
                <Typography variant="body2">
                  {eventInfo.event.extendedProps.title2}
                </Typography>
              </>
            }
            placement="right"
            arrow
          >
            {normalText}
          </Tooltip>
        )}
      </>
    );

  return body;
};

const renderWeekNumberContent = (weekInfo) => {
  return weekInfo.num;
};

const sxCalendar = {
  '&.MuiBox-root': {
    '& .fc': {
      userSelect: 'none',
      '& .fc-popover': {
        zIndex: 1000,
        bgcolor: 'primary.dark',
        borderRadius: 2,
        borderColor: 'primary.dark',
        '& .fc-popover-header': {
          bgcolor: (theme) => alpha(theme.palette.primary.light, 0.4),
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        },
        '& .fc-popover-body': {
          '& .fc-daygrid-event': {
            bgcolor: 'inherit',
            border: 'none',
            marginBottom: 0.5,
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.primary.light, 0.15),
            },
          },
        },
      },

      '& .fc-header-toolbar': {
        marginBottom: '0 !important',
      },
      '& .fc-daygrid': {
        '& .fc-scrollgrid': {
          borderLeft: 'none !important',
          borderTopColor: 'primary.light',
          '& td': {
            borderColor: 'primary.light',
          },
          '& td:last-of-type': {
            borderBottom: 'none !important',
            borderRight: 'none !important',
            '& .fc-daygrid-day-number': {
              paddingRight: 2,
            },
          },
          '& th': {
            height: '50px',
            verticalAlign: 'middle',
            borderRight: 'none !important',
            borderLeft: 'none !important',
            borderColor: 'primary.light',
          },
          '& .fc-daygrid-week-number': {
            color: 'text.secondary',
            borderBottomRightRadius: 8,
            bgcolor: (theme) => alpha(theme.palette.primary.light, 0.2),
          },
          '& .fc-day-today': {
            bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
            '& .fc-daygrid-day-number': {
              color: 'secondary.main',
              fontWeight: 600,
            },
          },
          '& .fc-daygrid-event': {
            mx: 0.5,
            mt: '3px',
            bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.55),
            borderColor: (theme) => alpha(theme.palette.secondary.main, 0.4),
            '&.priority': {
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.8),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.7),
              },
            },
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.3),
            },
          },
        },
      },
      '& .fc-list': {
        border: 'none !important',
        '& .fc-list-empty': {
          bgcolor: 'primary.main',
        },
        '& .fc-list-day': {
          '&.fc-day-today th': {
            bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.45),
            '& .fc-list-day-cushion': {
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.75),
            },
          },
          '& th': {
            bgcolor: 'primary.dark',
            border: 'none',
            '& .fc-list-day-cushion': {
              bgcolor: (theme) => alpha(theme.palette.primary.light, 0.4),
            },
          },
        },
        '& tr.fc-list-event': {
          '&:hover': {
            '& td': {
              bgcolor: 'action.hover',
            },
          },
          '& td': {
            border: 'none',
            fontSize: '0.875rem',
            px: '10px',
            '&.fc-list-event-graphic': {
              px: '4px',
            },
          },
          '& .fc-list-event-dot': {
            borderColor: (theme) => alpha(theme.palette.secondary.main, 0.5),
          },
          '&.priority': {
            '& .fc-list-event-dot': {
              borderColor: 'secondary.main',
            },
          },
        },
      },
    },
  },
};

export default Calendar;
