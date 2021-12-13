import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Highlighter from 'react-highlight-words';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import { TransitionGroup } from 'react-transition-group';
import { Typography, Box, Stack, IconButton } from '@mui/material';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '../UI/Acordions/MainAccordion';
import Edit from './Edit';
import Delete from './Delete';

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
          <Collapse key={teacher.teacherId}>
            <Accordion
              expanded={expanded === teacher.teacherId}
              onChange={handleChange(teacher.teacherId)}
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
                  <Typography
                    variant="subtitle2"
                    sx={{ wordBreak: ' break-all' }}
                  >
                    {t('global.email')}: {teacher.teacherEmail}
                  </Typography>

                  <Stack direction="row" spacing={0}>
                    <IconButton
                      color="secondary"
                      sx={{
                        padding: 0,
                        width: 44,
                        height: 44,
                        ...(settings && {
                          bgcolor: (theme) =>
                            alpha(
                              theme.palette.secondary.main,
                              theme.palette.action.focusOpacity
                            ),
                        }),
                      }}
                      onClick={showSettings.bind(null, teacher)}
                    >
                      <SettingsIcon
                        sx={{
                          width: 28,
                          height: 28,
                          color: settings ? 'secondary.main' : 'primary.light',
                        }}
                      />
                    </IconButton>

                    <IconButton
                      color="secondary"
                      sx={{
                        padding: 0,
                        width: 44,
                        height: 44,
                        ...(deleting && {
                          bgcolor: (theme) =>
                            alpha(
                              theme.palette.secondary.main,
                              theme.palette.action.focusOpacity
                            ),
                        }),
                      }}
                      onClick={showDeleting.bind(null, teacher)}
                    >
                      <DeleteIcon
                        sx={{
                          width: 28,
                          height: 28,
                          color: deleting ? 'secondary.main' : 'primary.light',
                        }}
                      />
                    </IconButton>
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
