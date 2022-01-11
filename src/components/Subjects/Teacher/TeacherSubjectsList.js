import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import Highlighter from 'react-highlight-words';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import { Typography, Box, Stack } from '@mui/material';

import DeleteSubject from '../DeleteSubject';
import IconButton from '../../UI/Buttons/IconButton';
import EditTeacherSubject from './EditTeacherSubject';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '../../UI/Acordions/MainAccordion';

const TeacherSubjectsList = ({ subjectsList, search }) => {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const paletteColor = useSelector((state) => state.palette.color);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const showEditing = (teacher) => {
    setEditing(teacher);
  };

  const showDeleting = (teacher) => {
    setDeleting(teacher);
  };

  const closeEditing = () => {
    setEditing(null);
  };

  const closeDeleting = () => {
    setDeleting(null);
  };

  return (
    <Box>
      <TransitionGroup>
        {subjectsList.map((subject) => (
          <Collapse key={subject.id}>
            <Accordion
              expanded={expanded === subject.id}
              onChange={handleChange(subject.id)}
            >
              <AccordionSummary>
                <Typography variant="subtitle1">
                  <Highlighter
                    searchWords={[search]}
                    highlightStyle={{
                      color: paletteColor,
                      backgroundColor: 'inherit',
                    }}
                    textToHighlight={subject.name}
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
                  <Stack direction="column" spacing={0.5}>
                    <Typography variant="subtitle2">
                      {t('fields.faculty')}: {subject.field.faculty.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      {t('fields.university')}:{' '}
                      {subject.field.faculty.university.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      {t('subjects.types')}:{' '}
                      {subject.teacherSubjectTypes
                        .slice()
                        .sort((a, b) => a.type.name.localeCompare(b.type.name))
                        .map((tst, index) => {
                          if (
                            index + 1 ===
                            subject.teacherSubjectTypes.length
                          ) {
                            return (
                              <Box component="span" key={index}>
                                {tst.type.name}
                              </Box>
                            );
                          }
                          return (
                            <Box component="span" key={index}>
                              {`${tst.type.name}, `}
                            </Box>
                          );
                        })}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <IconButton
                      tooltip={t('global.edit')}
                      onClick={showEditing.bind(null, subject)}
                      open={editing}
                      Icon={EditIcon}
                    />
                    <IconButton
                      tooltip={t('global.delete')}
                      onClick={showDeleting.bind(null, subject)}
                      open={deleting}
                      Icon={DeleteIcon}
                    />
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Collapse>
        ))}
      </TransitionGroup>
      <EditTeacherSubject editing={editing} onClose={closeEditing} />
      <DeleteSubject deleting={deleting} onClose={closeDeleting} />
    </Box>
  );
};

export default TeacherSubjectsList;
