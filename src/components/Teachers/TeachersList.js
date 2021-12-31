import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import Highlighter from 'react-highlight-words';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Box, Stack } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import Edit from './EditTeacher';
import Delete from './DeleteTeacher';
import IconButton from '../UI/Buttons/IconButton';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '../UI/Acordions/MainAccordion';

const TeachersList = ({ teachersList, search, loading }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [settings, setSettings] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const paletteColor = useSelector((state) => state.palette.color);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const showSettings = (teacher) => {
    setSettings(teacher);
  };

  const showDeleting = (teacher) => {
    setDeleting(teacher);
  };

  const closeSettings = () => {
    setSettings(null);
  };

  const closeDeleting = () => {
    setDeleting(null);
  };

  return (
    <Box>
      <TransitionGroup>
        {teachersList.map((teacher) => (
          <Collapse key={teacher.id}>
            <Accordion
              expanded={expanded === teacher.id}
              onChange={handleChange(teacher.id)}
            >
              <AccordionSummary>
                <Typography variant="subtitle1">
                  <Highlighter
                    searchWords={[search]}
                    highlightStyle={{
                      color: paletteColor,
                      backgroundColor: 'inherit',
                    }}
                    textToHighlight={`${teacher.academicTitle} ${teacher.firstName} ${teacher.lastName}`}
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
                  <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    {t('global.email')}:{' '}
                    {teacher.email ? teacher.email : t('teachers.emptyEmail')}
                  </Typography>

                  <Stack direction="row" spacing={0}>
                    <IconButton
                      tooltip={t('global.edit')}
                      onClick={showSettings.bind(null, teacher)}
                      open={settings}
                      Icon={EditIcon}
                    />

                    <IconButton
                      tooltip={t('global.delete')}
                      onClick={showDeleting.bind(null, teacher)}
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
      <Edit settings={settings} onClose={closeSettings} />
      <Delete deleting={deleting} onClose={closeDeleting} />
      {!teachersList.length && search && (
        <Box sx={{ textAlign: 'center' }}>
          <Stack>
            <Typography variant="h6">{t('global.notFound')}</Typography>
            <Typography>
              {t('global.notFoundDesc', { search: search })}
            </Typography>
          </Stack>
        </Box>
      )}
      {!teachersList.length && !search && !loading && (
        <Box sx={{ textAlign: 'center' }}>
          <Stack>
            <Typography variant="h6">{t('teachers.letsAdd')}</Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default TeachersList;
