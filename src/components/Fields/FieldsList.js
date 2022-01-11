import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import Highlighter from 'react-highlight-words';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Box, Stack } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

import EditField from './EditField';
import DeleteField from './DeleteField';
import IconButton from '../UI/Buttons/IconButton';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '../UI/Acordions/MainAccordion';

const FieldsList = ({ fieldsList, search, loading }) => {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const paletteColor = useSelector((state) => state.palette.color);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const editOpenHandler = (field) => {
    setEditing(field);
  };

  const editCloseHandler = () => {
    setEditing(null);
  };

  const deleteOpenHandler = (field) => {
    setDeleting(field);
  };

  const deleteCloseHandler = () => {
    setDeleting(null);
  };

  return (
    <Box>
      <TransitionGroup>
        {fieldsList.map((field) => (
          <Collapse key={field.id}>
            <Accordion
              expanded={expanded === field.id}
              onChange={handleChange(field.id)}
            >
              <AccordionSummary>
                <Typography variant="subtitle1">
                  <Highlighter
                    searchWords={[search]}
                    highlightStyle={{
                      color: paletteColor,
                      backgroundColor: 'inherit',
                    }}
                    textToHighlight={field.name}
                  />
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={{ xs: 0.5, md: 2 }}
                >
                  <Stack direction="column" spacing={0.5}>
                    <Typography variant="subtitle2">
                      {t('fields.faculty')}: {field.faculty.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      {t('fields.university')}: {field.faculty.university.name}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0}>
                    <IconButton
                      tooltip={t('universities.editFaculty')}
                      onClick={editOpenHandler.bind(null, field)}
                      open={editing}
                      Icon={EditIcon}
                      defaultSize={24}
                      circleSize={34}
                    />

                    <IconButton
                      tooltip={t('universities.deleteFaculty')}
                      onClick={deleteOpenHandler.bind(null, field)}
                      open={deleting}
                      Icon={DeleteIcon}
                      defaultSize={24}
                      circleSize={34}
                    />
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Collapse>
        ))}
      </TransitionGroup>

      <EditField editing={editing} onClose={editCloseHandler} />

      <DeleteField deleting={deleting} onClose={deleteCloseHandler} />

      {!fieldsList.length && search && (
        <Box sx={{ textAlign: 'center' }}>
          <Stack>
            <Typography variant="h6">{t('global.notFound')}</Typography>
            <Typography>
              {t('global.notFoundDesc', { search: search })}
            </Typography>
          </Stack>
        </Box>
      )}

      {!fieldsList.length && !search && !loading && (
        <Box sx={{ textAlign: 'center' }}>
          <Stack>
            <Typography variant="h6">{t('fields.letsAdd')}</Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default FieldsList;
