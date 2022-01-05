import { format } from 'date-fns';
import React, { forwardRef } from 'react';
import { alpha } from '@mui/material/styles';
import plLocaleFNS from 'date-fns/locale/pl';
import FullCalendar from '@fullcalendar/react';
import { useTranslation } from 'react-i18next';
import enLocaleFNS from 'date-fns/locale/en-US';
import { Box, Tooltip, Typography } from '@mui/material';

import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import plLocale from '@fullcalendar/core/locales/pl';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = forwardRef(({ events }, calendar) => {
  const { i18n } = useTranslation();

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
  let startTimeString = '';
  let endTimeString = '';

  switch (eventInfo.view.dateEnv.locale.codeArg) {
    case 'pl':
      startTimeString = format(startTime, 'HH:mm', {
        locale: plLocaleFNS,
      });
      endTimeString = format(endTime, 'HH:mm', {
        locale: plLocaleFNS,
      });
      break;
    case 'en':
    default:
      startTimeString = format(startTime, 'h:mmaaaaa', {
        locale: enLocaleFNS,
      });
      endTimeString = format(endTime, 'h:mmaaaaa', {
        locale: enLocaleFNS,
      });
      break;
  }

  const body =
    eventInfo.view.type === 'listWeek' ? (
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
    ) : (
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
        <Typography
          variant="body2"
          onClick={eventInfo.event.extendedProps.onClick}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            px: 0.5,
          }}
        >
          <span style={{ fontWeight: 600 }}>{startTimeString} </span>
          {eventInfo.event.title}
        </Typography>
      </Tooltip>
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
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.9),
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
