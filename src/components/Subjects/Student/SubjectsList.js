import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import Highlighter from 'react-highlight-words';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import { Typography, Box, Stack } from '@mui/material';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '../../UI/Acordions/MainAccordion';
import IconButton from '../../UI/Buttons/IconButton';

const SubjectsList = ({ subjectsList, search, loading }) => {
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

  /*   const closeSettings = () => {
    setSettings(null);
  };

  const closeDeleting = () => {
    setDeleting(null);
  };
 */

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
                    textToHighlight={`${subject.name}`}
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
                  <Stack direction="column" spacing={2}>
                    {subject.teacherSubjectTypes
                      .slice()
                      .sort(
                        (a, b) =>
                          a.primaryKey.type.name.localeCompare(
                            b.primaryKey.type.name
                          ) ||
                          a.primaryKey.teacher.firstName.localeCompare(
                            b.primaryKey.teacher.firstName
                          ) ||
                          a.primaryKey.teacher.lastName.localeCompare(
                            b.primaryKey.teacher.lastName
                          )
                      )
                      .map((tst, index) => (
                        <Typography
                          variant="subtitle2"
                          sx={{ wordBreak: 'break-all' }}
                          key={index}
                        >
                          {`${tst.primaryKey.type.name}: ${tst.primaryKey.teacher.academicTitle} ${tst.primaryKey.teacher.firstName} ${tst.primaryKey.teacher.lastName}`}
                        </Typography>
                      ))}
                  </Stack>
                  <Stack direction="row">
                    <IconButton
                      tooltip={t('global.edit')}
                      onClick={showSettings.bind(null, subject)}
                      open={settings}
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
      {/* <Edit settings={settings} onClose={closeSettings} />
      <Delete deleting={deleting} onClose={closeDeleting} /> */}
      {!subjectsList.length && search && (
        <Box sx={{ textAlign: 'center' }}>
          <Stack>
            <Typography variant="h6">{t('global.notFound')}</Typography>
            <Typography>
              {t('global.notFoundDesc', { search: search })}
            </Typography>
          </Stack>
        </Box>
      )}
      {!subjectsList.length && !search && !loading && (
        <Box sx={{ textAlign: 'center' }}>
          <Stack>
            <Typography variant="h6">{t('subjects.letsAdd')}</Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default SubjectsList;
