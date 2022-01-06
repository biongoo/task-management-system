import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import plLocaleFNS from 'date-fns/locale/pl';
import { useTranslation } from 'react-i18next';
import enLocaleFNS from 'date-fns/locale/en-US';
import EditIcon from '@mui/icons-material/Edit';
import TaskIcon from '@mui/icons-material/Task';
import InfoIcon from '@mui/icons-material/Info';
import Highlighter from 'react-highlight-words';
import { Typography, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import React, { useState, useMemo } from 'react';
import RestorePageIcon from '@mui/icons-material/RestorePage';

import EditHomework from './EditHomework';
import FinishHomework from './FinishHomework';
import DeleteHomework from './DeleteHomework';
import IconButton from '../UI/Buttons/IconButton';
import Attachments from './Attachments';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '../UI/Acordions/MainAccordion';

const initAttachments = {
  files: [],
  description: '',
  open: false,
};

const HomeworkList = ({ homework, search, tab, homeworkToCalculateTime }) => {
  const { t, i18n } = useTranslation();
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [finishing, setFinishing] = useState(null);
  const [attachments, setAttachments] = useState(initAttachments);
  const paletteColor = useSelector((state) => state.palette.color);

  const plan = useSelector((state) => state.plan.plan).map((item) => {
    return { ...item, day: (item.day + 1) % 7 };
  });
  const events = useSelector((state) => state.events.events);

  const intervals = useMemo(
    () => buildIntervals(events, plan, homeworkToCalculateTime),
    [events, plan, homeworkToCalculateTime]
  );

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpenFinish = (id, name, isDone) => {
    setFinishing({ id, name, isDone });
  };

  const handleCloseFinish = () => {
    setFinishing(null);
    setExpanded(false);
  };

  const handleOpenAttachments = (attachments) => {
    setAttachments({ ...attachments, open: true });
  };

  const handleCloseAttachments = () => {
    setAttachments(initAttachments);
  };

  const handleOpenEdit = (material) => {
    setEditing(material);
  };

  const handleCloseEdit = () => {
    setEditing(null);
  };

  const handleOpenDelete = (id) => {
    setDeleting(id);
  };

  const handleCloseDelete = () => {
    setDeleting(null);
  };

  return (
    <>
      <TransitionGroup>
        {homework.map((homework) => (
          <Collapse key={homework.id}>
            <Accordion
              expanded={expanded === homework.id}
              onChange={handleChange(homework.id)}
            >
              <AccordionSummary>
                <Typography variant="subtitle1">
                  <Highlighter
                    searchWords={[search]}
                    highlightStyle={{
                      color: paletteColor,
                      backgroundColor: 'inherit',
                    }}
                    textToHighlight={`${buildDate(
                      new Date(homework.deadline),
                      i18n.language
                    )} - ${homework.teacherSubjectType.subject.name}`}
                  />
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Stack spacing={0.5}>
                    <Typography variant="body2">
                      {`${t('global.name')}: ${homework.name}`}
                    </Typography>
                    <Typography variant="body2">
                      {`${t('global.date')}: ${buildDateTime(
                        new Date(homework.date),
                        i18n.language
                      )}`}
                    </Typography>
                    <Typography variant="body2">
                      {`${t('global.deadline')}: ${buildDateTime(
                        new Date(homework.deadline),
                        i18n.language
                      )}`}
                    </Typography>
                    <Typography variant="body2">
                      {`${t('global.type')}: ${getType(
                        homework.teacherSubjectType
                      )}`}
                    </Typography>
                    {homework.estimatedTime > 0 && (
                      <Typography variant="body2">
                        {`${t('homework.estimatedTime')}: ${getHour(
                          homework.estimatedTime,
                          t
                        )}`}
                      </Typography>
                    )}
                    <Typography variant="body2">
                      {`${t('global.isMarked')}: ${t(
                        `global.${homework.isMarked ? 'yes' : 'no'}`
                      )}`}
                    </Typography>
                  </Stack>
                  <Stack>
                    <IconButton
                      tooltip={
                        !tab ? t('homework.finish') : t('homework.restore')
                      }
                      onClick={handleOpenFinish.bind(
                        null,
                        homework.id,
                        homework.name,
                        homework.isDone
                      )}
                      open={finishing}
                      Icon={!tab ? TaskIcon : RestorePageIcon}
                      defaultSize={24}
                      circleSize={34}
                      placement="left"
                    />
                    <IconButton
                      tooltip={t('global.edit')}
                      onClick={handleOpenEdit.bind(null, homework)}
                      open={editing}
                      Icon={EditIcon}
                      defaultSize={24}
                      circleSize={34}
                      placement="left"
                    />
                    <IconButton
                      tooltip={t('materials.info')}
                      onClick={handleOpenAttachments.bind(null, {
                        files: homework.files,
                        description: homework.description,
                      })}
                      open={attachments.open}
                      Icon={InfoIcon}
                      defaultSize={24}
                      circleSize={34}
                      placement="left"
                    />
                    <IconButton
                      tooltip={t('global.delete')}
                      onClick={handleOpenDelete.bind(null, homework.id)}
                      open={editing}
                      Icon={DeleteIcon}
                      defaultSize={24}
                      circleSize={34}
                      placement="left"
                    />
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Collapse>
        ))}
      </TransitionGroup>
      <DeleteHomework deleting={deleting} onClose={handleCloseDelete} />
      <FinishHomework finishing={finishing} onClose={handleCloseFinish} />
      <EditHomework editing={editing} onClose={handleCloseEdit} />
      <Attachments
        attachments={attachments}
        handleClose={handleCloseAttachments}
      />
    </>
  );
};

let flag = 0;

const buildIntervals = (events, plan, homeworkToCalculateTime) => {
  const intervals = [];

  for (const event of events) {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);

    start.setSeconds(0);
    start.setMilliseconds(0);
    end.setSeconds(0);
    end.setMilliseconds(0);

    const index = intervals.findIndex(
      (item) => item.start.getTime() >= start.getTime()
    );

    if (index === -1) {
      intervals.push({ start, end });
    } else {
      if (
        !(
          intervals[index].start.getTime() === start.getTime() &&
          intervals[index].end.getTime() === end.getTime()
        )
      )
        intervals.splice(index, 0, { start, end });
    }
  }

  for (const task of homeworkToCalculateTime) {
    const startDate = new Date(task.date);
    const endDate = new Date(task.deadline);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    for (let i = 0; i <= diffDays; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      const planFromStartToEnd = plan.filter(
        (item) => item.day === date.getDay()
      );

      const weekNumber = getWeekNumber(date);

      for (const item of planFromStartToEnd) {
        const startTimeSplited = item.startTime.split(':');
        const endTimeSplited = item.endTime.split(':');
        const start = new Date(date);
        const end = new Date(date);

        start.setHours(startTimeSplited[0]);
        start.setMinutes(startTimeSplited[1]);
        start.setSeconds(0);
        start.setMilliseconds(0);
        end.setHours(endTimeSplited[0]);
        end.setMinutes(endTimeSplited[1]);
        end.setSeconds(0);
        end.setMilliseconds(0);

        if (item.repetition) {
          if (weekNumber % 2 !== item.repetition % 2) {
            continue;
          }
        }

        const index = intervals.findIndex(
          (item) => item.start.getTime() >= start.getTime()
        );

        if (index === -1) {
          intervals.push({ start, end });
        } else {
          if (
            !(
              intervals[index].start.getTime() === start.getTime() &&
              intervals[index].end.getTime() === end.getTime()
            )
          )
            intervals.splice(index, 0, { start, end });
        }
      }
    }
  }

  const homeworkTime = [];

  if (flag < 3) {
    console.clear();
    flag++;
  }

  for (const task of homeworkToCalculateTime) {
    const times = [];
    let start = new Date(task.date);
    const end = new Date(task.end);
    let estimatedTime = task.estimatedTime;

    start.setSeconds(0);
    start.setMilliseconds(0);
    end.setSeconds(0);
    end.setMilliseconds(0);

    let breakLoop = false;
    if (estimatedTime) {
      for (const index in intervals) {
        let minutes = 0;
        const interval = intervals[index];

        if (start.getTime() < interval.start.getTime()) {
          while (start.getTime() < interval.start.getTime()) {
            let maxDayTime = new Date(start.getTime());
            let maxTime = new Date(interval.start);

            maxDayTime.setHours(22);
            maxDayTime.setMinutes(0);

            if (maxDayTime.getTime() < maxTime.getTime()) {
              maxTime = maxDayTime;
            }

            minutes = (maxTime.getTime() - start.getTime()) / 1000 / 60;

            if (minutes >= estimatedTime) {
              maxTime.setHours(start.getHours());
              maxTime.setMinutes(start.getMinutes() + estimatedTime);
            }

            times.push({ start: new Date(start), end: new Date(maxTime) });

            if (minutes >= estimatedTime) {
              breakLoop = true;
              break;
            }

            if (maxDayTime.getTime() === maxTime.getTime()) {
              start.setDate(start.getDate() + 1);
              start.setHours(8);
              start.setMinutes(0);
            } else {
              start = new Date(interval.end);
            }

            estimatedTime -= minutes;
          }
        } else {
          start = new Date(interval.end);
        }

        if (breakLoop) break;
      }
    }

    for (const time of times) {
      const start = new Date(time.start);
      const end = new Date(time.end);

      const index = intervals.findIndex(
        (item) => item.start.getTime() >= start.getTime()
      );

      if (index === -1) {
        intervals.push({ start, end });
      } else {
        if (
          !(
            intervals[index].start.getTime() === start.getTime() &&
            intervals[index].end.getTime() === end.getTime()
          )
        )
          intervals.splice(index, 0, { start, end });
      }
    }

    homeworkTime.push({ id: task.id, times });
  }

  console.log(homeworkTime);
  console.log(intervals);

  return intervals;
};

const buildDateTime = (date, lang) => {
  let stringTime = '';

  switch (lang) {
    case 'pl':
      stringTime = format(date, 'yyyy.MM.dd HH:mm', {
        locale: plLocaleFNS,
      });
      break;
    case 'en':
    default:
      stringTime = format(date, "yyyy/MM/dd h:mmaaaaa'm'", {
        locale: enLocaleFNS,
      });
      break;
  }

  return stringTime;
};

const buildDate = (date, lang) => {
  let stringTime = '';

  switch (lang) {
    case 'pl':
      stringTime = format(date, 'yyyy.MM.dd', {
        locale: plLocaleFNS,
      });
      break;
    case 'en':
    default:
      stringTime = format(date, 'yyyy/MM/dd', {
        locale: enLocaleFNS,
      });
      break;
  }

  return stringTime;
};

const getHour = (totalMinutes, t) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return hours
    ? minutes
      ? t('homework.time', { h: hours, m: minutes })
      : t('homework.timeWoM', { h: hours })
    : t('homework.timeWoH', { m: minutes });
};

const getWeekNumber = (d) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
};

const getType = (tst) => {
  let type = '';
  type += tst.type.name;
  type += ' - ';
  type += tst.teacher.academicTitle;
  type += ' ';
  type += tst.teacher.firstName;
  type += ' ';
  type += tst.teacher.lastName;
  return type;
};

export default HomeworkList;
