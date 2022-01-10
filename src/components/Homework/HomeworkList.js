import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import TaskIcon from '@mui/icons-material/Task';
import InfoIcon from '@mui/icons-material/Info';
import Highlighter from 'react-highlight-words';
import { Typography, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import React, { useState, useMemo } from 'react';
import RestorePageIcon from '@mui/icons-material/RestorePage';

import Attachments from './Attachments';
import EditHomework from './EditHomework';
import FinishHomework from './FinishHomework';
import DeleteHomework from './DeleteHomework';
import IconButton from '../UI/Buttons/IconButton';
import { buildDate, buildDateTime } from '../../utils/formatDate';
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
  dateList: { times: [] },
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

  const homeworkTime = useMemo(
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
                        dateList: homeworkTime.find(
                          (item) => item.id === homework.id
                        ),
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
                      open={deleting}
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
        buildDateTime={buildDateTime}
      />
    </>
  );
};

const buildIntervals = (events, plan, homeworkToCalculateTime) => {
  const intervals = [];

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

        insertWithoutDuplicates(intervals, index, start, end);
      }
    }

    for (const event of events) {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);

      if (
        end.getTime() < startDate.getTime() ||
        start.getTime() > endDate.getTime()
      ) {
        continue;
      }

      start.setSeconds(0);
      start.setMilliseconds(0);
      end.setSeconds(0);
      end.setMilliseconds(0);

      const index = intervals.findIndex(
        (item) => item.start.getTime() >= start.getTime()
      );

      insertWithoutDuplicates(intervals, index, start, end);
    }
  }

  const homeworkTime = [];

  for (const task of homeworkToCalculateTime) {
    const times = [];
    const startTaskDate = new Date(task.date);
    const endTaskDate = new Date(task.deadline);

    let estimatedTime = task.estimatedTime;
    let freeStart = new Date(startTaskDate);

    freeStart.setSeconds(0);
    startTaskDate.setSeconds(0);
    freeStart.setMilliseconds(0);
    startTaskDate.setMilliseconds(0);

    let breakLoop = false;

    if (estimatedTime) {
      for (const index in intervals) {
        const interval = intervals[index];

        if (startTaskDate.getTime() > interval.end.getTime()) continue;

        while (
          freeStart < interval.start &&
          estimatedTime > 0 &&
          freeStart < endTaskDate
        ) {
          const maxDayTime = new Date(freeStart);
          let maxTime = new Date(interval.start);
          maxDayTime.setHours(22);
          maxDayTime.setMinutes(0);

          const prevIndex = index - 1;
          if (prevIndex >= 0) {
            if (freeStart < intervals[index - 1].end) {
              freeStart = new Date(intervals[index - 1].end);
              continue;
            }
          }

          if (maxDayTime.getTime() < maxTime.getTime()) {
            maxTime = maxDayTime;
          }

          const minutes = (maxTime.getTime() - freeStart.getTime()) / 1000 / 60;

          if (minutes > estimatedTime) {
            maxTime.setHours(freeStart.getHours());
            maxTime.setMinutes(freeStart.getMinutes() + estimatedTime);
          }

          times.push({ start: new Date(freeStart), end: new Date(maxTime) });
          estimatedTime -= minutes;

          if (estimatedTime <= 0) {
            breakLoop = true;
            break;
          }

          if (maxDayTime.getTime() === maxTime.getTime()) {
            freeStart.setDate(freeStart.getDate() + 1);
            freeStart.setHours(8);
            freeStart.setMinutes(0);
          } else {
            freeStart = new Date(interval.end);
          }
        }
        if (breakLoop) break;
      }

      if (estimatedTime <= 0) {
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
      }
    }

    homeworkTime.push({ id: task.id, times: estimatedTime <= 0 ? times : [] });
  }

  return homeworkTime;
};

const insertWithoutDuplicates = (intervals, index, start, end) => {
  if (index === -1) {
    let lastIndex = intervals.length - 1;
    let newStart = new Date(start);
    let newEnd = new Date(end);

    if (
      typeof intervals[lastIndex] !== 'undefined' &&
      intervals[lastIndex].end >= start
    ) {
      newStart = new Date(intervals[lastIndex].start);
      newEnd = new Date(
        intervals[lastIndex].end > end ? intervals[lastIndex].end : end
      );
      intervals.splice(lastIndex, 1);
      lastIndex--;

      while (
        typeof intervals[lastIndex] !== 'undefined' &&
        intervals[lastIndex].end >= start
      ) {
        newEnd = new Date(
          intervals[lastIndex].end > end ? intervals[lastIndex].end : end
        );
        intervals.splice(lastIndex, 1);
        lastIndex--;
      }
    }
    intervals.push({ start: newStart, end: newEnd });
  } else {
    if (
      !(
        intervals[index].start.getTime() === start.getTime() &&
        intervals[index].end.getTime() === end.getTime()
      )
    ) {
      if (intervals[index].start <= end) {
        let endTime = new Date(
          end > intervals[index].end ? end : intervals[index].end
        );
        intervals.splice(index, 1);

        while (
          typeof intervals[index] !== 'undefined' &&
          intervals[index].start <= endTime
        ) {
          endTime = new Date(
            endTime > intervals[index].end ? endTime : intervals[index].end
          );
          intervals.splice(index, 1);
        }

        intervals.splice(index, 0, {
          start,
          end: endTime,
        });
      } else if (
        typeof intervals[index - 1] !== 'undefined' &&
        intervals[index - 1].end >= start
      ) {
        let startTime = new Date(
          intervals[index - 1].start < start
            ? intervals[index - 1].start
            : start
        );
        let endTime = new Date(
          intervals[index - 1].end > end ? intervals[index - 1].end : end
        );

        intervals.splice(index - 1, 1, {
          start: startTime,
          end: endTime,
        });
      } else {
        intervals.splice(index, 0, {
          start,
          end: end,
        });
      }
    }
  }
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
