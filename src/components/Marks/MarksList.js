import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import Highlighter from 'react-highlight-words';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Box, Stack } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import EditMark from './EditMark';
import DeleteMark from './DeleteMark';
import Divider from '../UI/Dividers/Divider';
import IconButton from '../UI/Buttons/IconButton';
import { buildDateTime } from '../../utils/formatDate';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '../UI/Acordions/MainAccordion';

const MarksList = ({ marks, search, loading }) => {
  const { t, i18n } = useTranslation();
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const paletteColor = useSelector((state) => state.palette.color);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpenEdit = (mark) => {
    setEditing(mark);
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

  const averageGrades = [];

  for (const index in marks) {
    const array = marks[index];
    let average = 0;
    let numbers = 0;

    for (const nextIdx in array) {
      if (typeof array[nextIdx].mark === 'number') {
        average += array[nextIdx].mark;
        numbers++;
      }
    }

    if (numbers !== 0) {
      average /= numbers;
    }

    averageGrades.push({
      name: index,
      average: Math.round(average * 100) / 100,
    });
  }

  return (
    <Box>
      <TransitionGroup>
        {Object.keys(marks).map((key) => (
          <Collapse key={key}>
            <Accordion expanded={expanded === key} onChange={handleChange(key)}>
              <AccordionSummary>
                <Typography variant="subtitle1">
                  <Highlighter
                    searchWords={[search]}
                    highlightStyle={{
                      color: paletteColor,
                      backgroundColor: 'inherit',
                    }}
                    textToHighlight={key}
                  />
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {findAverage(key, averageGrades) > 0 && (
                  <Stack sx={{ mb: '12px' }} spacing={1.5}>
                    <Typography variant="subtitle">
                      {`${t('marks.averageGrade')}: ${findAverage(
                        key,
                        averageGrades
                      )}`}
                    </Typography>
                    <Divider />
                  </Stack>
                )}
                <Stack component={TransitionGroup} spacing={1.5}>
                  {marks[key]
                    .slice()
                    .sort((a, b) => {
                      const first = a.date ? a.date : '';
                      const sec = b.date ? b.date : '';
                      return first.localeCompare(sec);
                    })
                    .map((mark, index) => {
                      const idx = index + 1;
                      let type = '';
                      type += mark.teacherSubjectType.type.name;
                      type += ' - ';
                      type += mark.teacherSubjectType.teacher.academicTitle;
                      type += ' ';
                      type += mark.teacherSubjectType.teacher.firstName;
                      type += ' ';
                      type += mark.teacherSubjectType.teacher.lastName;

                      return (
                        <Collapse key={mark.id}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            mb={idx !== marks[key].length ? 1.5 : 0}
                          >
                            <Stack spacing={0.5}>
                              {(mark.event || mark.homework) && (
                                <Typography variant="body2">
                                  {`${t('global.name')}: ${
                                    mark.event
                                      ? mark.event.name
                                      : mark.homework.name
                                  }`}
                                </Typography>
                              )}
                              {mark.mark && (
                                <Typography variant="body2">
                                  {`${t('global.mark')}: ${mark.mark}`}
                                </Typography>
                              )}
                              {!mark.mark && (
                                <Typography variant="body2">
                                  {`${t('global.mark')}: ${t(
                                    'marks.emptyMark'
                                  )}`}
                                </Typography>
                              )}
                              {mark.date && (
                                <Typography variant="body2">
                                  {`${t('global.date')}: ${buildDateTime(
                                    new Date(mark.date),
                                    i18n.language
                                  )}`}
                                </Typography>
                              )}
                              <Typography variant="body2">
                                {`${t('global.type')}: ${type}`}
                              </Typography>
                              {mark.description && (
                                <Typography variant="body2">
                                  {`${t('global.description')}: ${
                                    mark.description
                                  }`}
                                </Typography>
                              )}
                            </Stack>
                            <Stack>
                              <IconButton
                                tooltip={t('global.edit')}
                                onClick={handleOpenEdit.bind(null, mark)}
                                open={editing === mark}
                                Icon={EditIcon}
                                defaultSize={24}
                                circleSize={34}
                                placement="left"
                              />
                              <IconButton
                                tooltip={t('global.delete')}
                                onClick={handleOpenDelete.bind(null, mark)}
                                open={deleting === mark}
                                Icon={DeleteIcon}
                                defaultSize={24}
                                circleSize={34}
                                placement="left"
                              />
                            </Stack>
                          </Stack>
                          {idx !== marks[key].length && <Divider />}
                        </Collapse>
                      );
                    })}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Collapse>
        ))}
      </TransitionGroup>
      <EditMark editing={editing} onClose={handleCloseEdit} />
      <DeleteMark deleting={deleting} onClose={handleCloseDelete} />
      {!Object.keys(marks).length && search && (
        <Box sx={{ textAlign: 'center' }}>
          <Stack>
            <Typography variant="h6">{t('global.notFound')}</Typography>
            <Typography>
              {t('global.notFoundDesc', { search: search })}
            </Typography>
          </Stack>
        </Box>
      )}
      {!Object.keys(marks).length && !search && !loading && (
        <Box sx={{ textAlign: 'center' }}>
          <Stack>
            <Typography variant="h6">{t('marks.noMarks')}</Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

const findAverage = (key, array) => {
  const item = array.find((a) => a.name === key);
  return item.average;
};

export default MarksList;
