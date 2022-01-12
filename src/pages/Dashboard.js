import { format } from 'date-fns';
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
import { getWeekNumber } from '../utils/helpers';
import getEvents from '../store/events/getEvents';
import Header from '../components/Dashboard/Header';
import Calendar from '../components/Dashboard/Calendar';
import getHomework from '../store/homework/getHomework';
import EditEvent from '../components/Dashboard/EditEvent';

let flag = false;

const Dashboard = () => {
  const calendar = useRef(null);
  const dispatch = useDispatch();
  const [loadingFlag, setLoadingFlag] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const {
    plan,
    loading: loadingPlan,
    firstLoading: firstLoadingP,
  } = useSelector((state) => state.plan);

  const {
    homework,
    loading: loadingHomework,
    firstLoading: firstLoadingH,
  } = useSelector((state) => state.homework);

  const {
    events,
    loading: loadingEvents,
    firstLoading: firstLoadingE,
  } = useSelector((state) => state.events);

  flag = !firstLoadingP && !firstLoadingH && !firstLoadingE;

  useEffect(() => {
    if (flag) {
      dispatch(getPlan());
      dispatch(getEvents());
      dispatch(getHomework());
    }
  }, [dispatch]);

  useEffect(() => {
    if (loadingFlag) {
      setTimeout(() => {
        setLoadingFlag(false);
      }, 400);
    }
  }, [loadingFlag]);

  const handleOpenEditEvent = useCallback(
    (id) => {
      setEditingEvent(events.find((item) => item.id === id));
    },
    [events]
  );

  const handleCloseEditEvent = () => {
    setEditingEvent(null);
  };

  const calendarEvents = useMemo(() => {
    if (!loadingPlan && !loadingHomework && !loadingEvents) {
      return init(homework, events, plan, handleOpenEditEvent);
    }
    return [];
  }, [
    plan,
    events,
    homework,
    loadingPlan,
    loadingEvents,
    loadingHomework,
    handleOpenEditEvent,
  ]);

  const calendarEventsWithRep = useMemo(() => {
    if (!loadingPlan && !loadingHomework && !loadingEvents) {
      return [...calendarEvents, ...initRepetition(plan, currentDate)];
    }
    return [];
  }, [
    plan,
    currentDate,
    loadingPlan,
    loadingEvents,
    calendarEvents,
    loadingHomework,
  ]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingFlag || loadingPlan || loadingEvents || loadingHomework}
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
        <Header
          ref={calendar}
          currentDate={currentDate}
          setDate={(date) => setCurrentDate(date)}
        />
        <EditEvent editing={editingEvent} onClose={handleCloseEditEvent} />
        <Calendar ref={calendar} events={calendarEventsWithRep} />
      </Paper>
    </Box>
  );
};

const init = (homework, events, plan, handleOpenEditEvent) => {
  const array = [];

  if (
    !Array.isArray(homework) ||
    !Array.isArray(events) ||
    !Array.isArray(plan)
  )
    return array;

  for (const planElement of plan) {
    if (!planElement.repetition) {
      const name = planElement.name
        ? planElement.name
        : `${planElement.teacherSubjectType.subject.name}`;

      const name2 = planElement.name
        ? planElement.name
        : planElement.teacherSubjectType.teacher
        ? `${planElement.teacherSubjectType.subject.name} - ${planElement.teacherSubjectType.type.name} - ${planElement.teacherSubjectType.teacher.academicTitle} ${planElement.teacherSubjectType.teacher.firstName} ${planElement.teacherSubjectType.teacher.lastName}`
        : `${planElement.teacherSubjectType.subject.name} - ${planElement.teacherSubjectType.type.name}`;

      array.push({
        id: `p-${homework.id}`,
        daysOfWeek: [(planElement.day + 1) % 7],
        startTime: planElement.startTime,
        endTime: planElement.endTime,
        title: name,
        title2: name2,
      });
    }
  }

  for (const task of homework) {
    const name = task.name;
    const name2 = task.teacherSubjectType.teacher
      ? `${task.name} - ${task.teacherSubjectType.subject.name} - ${task.teacherSubjectType.type.name} - ${task.teacherSubjectType.teacher.academicTitle} ${task.teacherSubjectType.teacher.firstName} ${task.teacherSubjectType.teacher.lastName}`
      : `${task.name} - ${task.teacherSubjectType.subject.name} - ${task.teacherSubjectType.type.name}`;

    const nextMilisec = new Date(task.deadline);
    nextMilisec.setMilliseconds(nextMilisec.getMilliseconds() + 1);

    array.push({
      id: `h-${homework.id}`,
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
      ? event.teacherSubjectType.teacher
        ? `${event.name} - ${event.teacherSubjectType.subject.name} - ${event.teacherSubjectType.type.name} - ${event.teacherSubjectType.teacher.academicTitle} ${event.teacherSubjectType.teacher.firstName} ${event.teacherSubjectType.teacher.lastName}`
        : `${event.name} - ${event.teacherSubjectType.subject.name} - ${event.teacherSubjectType.type.name}`
      : event.name;

    array.push({
      id: `e-${homework.id}`,
      title: name,
      title2: name2,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      className: 'priority',
      priority: true,
      onClick: handleOpenEditEvent.bind(null, event.id),
    });
  }

  return array;
};

const initRepetition = (plan, currentDate) => {
  const array = [];

  if (!Array.isArray(plan)) return array;

  for (const planElement of plan) {
    if (planElement.repetition) {
      const name = planElement.name
        ? planElement.name
        : `${planElement.teacherSubjectType.subject.name}`;

      const name2 = planElement.name
        ? planElement.name
        : planElement.teacherSubjectType.teacher
        ? `${planElement.teacherSubjectType.subject.name} - ${planElement.teacherSubjectType.type.name} - ${planElement.teacherSubjectType.teacher.academicTitle} ${planElement.teacherSubjectType.teacher.firstName} ${planElement.teacherSubjectType.teacher.lastName}`
        : `${planElement.teacherSubjectType.subject.name} - ${planElement.teacherSubjectType.type.name}`;

      const dayOfWeek = (planElement.day + 1) % 7;
      const firstEventDateOnTab = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );

      let days = dayOfWeek - firstEventDateOnTab.getDay();
      if (days < 1) days += 7;
      firstEventDateOnTab.setDate(firstEventDateOnTab.getDate() + days);

      for (let i = -1; i <= 5; i++) {
        let newDate = new Date(firstEventDateOnTab.getTime());
        newDate.setDate(newDate.getDate() + i * 7);

        let weekNumber = getWeekNumber(newDate);
        let id = `p-${planElement.id}-${
          planElement.startTime
        }-${newDate.getDay()}-${weekNumber}-${newDate.getFullYear()}`;

        if (weekNumber % 2 === planElement.repetition % 2) {
          array.push({
            id: id,
            title: name,
            title2: name2,
            start: `${format(newDate, 'yyyy-MM-dd')}T${planElement.startTime}`,
            end: `${format(newDate, 'yyyy-MM-dd')}T${planElement.endTime}`,
          });
        }
      }
    }
  }

  return array;
};

export default Dashboard;
