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
import EditStudentSubject from './EditStudentSubject';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '../../UI/Acordions/MainAccordion';

const StudentSubjectsList = ({ subjectsList, search }) => {
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
                  <Stack direction="column" spacing={1.5}>
                    {subject.teacherSubjectTypes.length ? (
                      subject.teacherSubjectTypes
                        .slice()
                        .sort(
                          (a, b) =>
                            a.type.name.localeCompare(b.type.name) ||
                            a.teacher.firstName.localeCompare(
                              b.teacher.firstName
                            ) ||
                            a.teacher.lastName.localeCompare(b.teacher.lastName)
                        )
                        .map((tst, index) => (
                          <Typography variant="body2" key={index}>
                            {`${tst.type.name}: ${tst.teacher.academicTitle} ${tst.teacher.firstName} ${tst.teacher.lastName}`}
                          </Typography>
                        ))
                    ) : (
                      <Typography
                        variant="subtitle2"
                        sx={{ wordBreak: 'break-all' }}
                      >
                        {t('subjects.emptyGroups')}
                      </Typography>
                    )}
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
      <EditStudentSubject editing={editing} onClose={closeEditing} />
      <DeleteSubject deleting={deleting} onClose={closeDeleting} />
    </Box>
  );
};

export default StudentSubjectsList;
