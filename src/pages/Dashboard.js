import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Backdrop, CircularProgress } from '@mui/material';
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

import getPlan from '../store/plan/getPlan';
import getEvents from '../store/events/getEvents';
import Header from '../components/Dashboard/Header';
import Calendar from '../components/Dashboard/Calendar';
import getHomework from '../store/homework/getHomework';
import EditEvent from '../components/Dashboard/EditEvent';

let flag = false;
let flag2 = false;

const Dashboard = () => {
  const dispatch = useDispatch();
  const calendar = useRef(null);
  const [refreshPlan, setRefreshPlan] = useState(1);
  const [editingEvent, setEditingEvent] = useState(null);

  const { plan, firstLoading: loadingPlan } = useSelector(
    (state) => state.plan
  );

  const { homework, firstLoading: loadingHomework } = useSelector(
    (state) => state.homework
  );

  const { events, firstLoading: loadingEvents } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    if (flag) {
      dispatch(getPlan());
      dispatch(getEvents());
      dispatch(getHomework());
    } else flag = true;
  }, [dispatch]);

  const handleOpenEditEvent = useCallback(
    (id) => {
      setEditingEvent(events.find((item) => item.id === id));
    },
    [events]
  );

  const handleCloseEditEvent = () => {
    setEditingEvent(null);
  };

  const handleRefresh = () => {
    setRefreshPlan((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (refreshPlan > 0 && calendar.current) {
      if (flag2) {
        let calendarApi = calendar.current.getApi();

        for (const planElement of plan) {
          if (planElement.repetition) {
            const name = planElement.name
              ? planElement.name
              : `${planElement.teacherSubjectType.subject.name}`;

            const name2 = planElement.name
              ? planElement.name
              : `${planElement.teacherSubjectType.subject.name} - ${planElement.teacherSubjectType.type.name} - ${planElement.teacherSubjectType.teacher.academicTitle} ${planElement.teacherSubjectType.teacher.firstName} ${planElement.teacherSubjectType.teacher.lastName}`;

            const dayOfWeek = (planElement.day + 1) % 7;

            const firstEventDateOnTab = new Date(
              calendarApi.getDate().getFullYear(),
              calendarApi.getDate().getMonth(),
              1
            );
            let days = dayOfWeek - firstEventDateOnTab.getDay();
            if (days < 1) days += 7;
            firstEventDateOnTab.setDate(firstEventDateOnTab.getDate() + days);

            for (let i = -1; i <= 5; i++) {
              let newDate = new Date(firstEventDateOnTab.getTime());
              newDate.setDate(newDate.getDate() + i * 7);

              let weekNumber = getWeekNumber(newDate);
              let id = `${planElement.id}-${
                planElement.startTime
              }-${newDate.getDay()}-${weekNumber}-${newDate.getFullYear()}`;

              if (!calendarApi.getEventById(id)) {
                if (weekNumber % 2 === planElement.repetition % 2) {
                  calendarApi.addEvent({
                    id: id,
                    title: name,
                    title2: name2,
                    start: `${formatDate(newDate)}T${planElement.startTime}`,
                    end: `${formatDate(newDate)}T${planElement.endTime}`,
                  });
                }
              }
            }
          }
        }
      } else flag2 = true;
    }
  }, [calendar, plan, refreshPlan]);

  const calendarEvents = useMemo(
    () => init(homework, events, plan, handleOpenEditEvent),
    [homework, events, plan, handleOpenEditEvent]
  );

  const calendarMemo = useMemo(
    () => <Calendar ref={calendar} events={calendarEvents} />,
    [calendarEvents]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingPlan || loadingHomework || loadingEvents}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper
        sx={{
          width: { xs: '95%', md: '95%' },
          maxWidth: '1700px',
          paddingTop: { xs: 2, md: 2.5 },
          bgcolor: 'primary.main',
          boxShadow: 4,
          borderRadius: 4,
        }}
      >
        <Header ref={calendar} refreshPlan={handleRefresh} />
        <EditEvent editing={editingEvent} onClose={handleCloseEditEvent} />
        {calendarMemo}
      </Paper>
    </Box>
  );
};

const init = (homework, events, plan, handleOpenEditEvent) => {
  const array = [];

  for (const task of homework) {
    const name = task.name;
    const name2 = `${task.name} - ${task.teacherSubjectType.subject.name} - ${task.teacherSubjectType.type.name} - ${task.teacherSubjectType.teacher.academicTitle} ${task.teacherSubjectType.teacher.firstName} ${task.teacherSubjectType.teacher.lastName}`;

    const nextMilisec = new Date(task.deadline);
    nextMilisec.setMilliseconds(nextMilisec.getMilliseconds() + 1);

    array.push({
      title: name,
      title2: name2,
      start: new Date(task.deadline),
      end: nextMilisec,
      onlyDeadline: true,
      className: 'priority',
      priority: true,
    });
  }

  for (const event of events) {
    const name = event.name;
    const name2 = event.teacherSubjectType
      ? `${event.name} - ${event.teacherSubjectType.subject.name} - ${event.teacherSubjectType.type.name} - ${event.teacherSubjectType.teacher.academicTitle} ${event.teacherSubjectType.teacher.firstName} ${event.teacherSubjectType.teacher.lastName}`
      : event.name;

    array.push({
      title: name,
      title2: name2,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      className: 'priority',
      priority: true,
      onClick: handleOpenEditEvent.bind(null, event.id),
    });
  }

  for (const planElement of plan) {
    if (!planElement.repetition) {
      const name = planElement.name
        ? planElement.name
        : `${planElement.teacherSubjectType.subject.name}`;
      const name2 = planElement.name
        ? planElement.name
        : `${planElement.teacherSubjectType.subject.name} - ${planElement.teacherSubjectType.type.name} - ${planElement.teacherSubjectType.teacher.academicTitle} ${planElement.teacherSubjectType.teacher.firstName} ${planElement.teacherSubjectType.teacher.lastName}`;

      array.push({
        daysOfWeek: [(planElement.day + 1) % 7],
        startTime: planElement.startTime,
        endTime: planElement.endTime,
        title: name,
        title2: name2,
      });
    }
  }

  return array;
};

const getWeekNumber = (d) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
};

const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export default Dashboard;
