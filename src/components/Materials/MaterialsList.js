import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import Highlighter from 'react-highlight-words';
import { Typography, Box, Stack } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import InfoIcon from '@mui/icons-material/Info';

import Attachments from './Attachments';
import EditMaterial from './EditMaterial';
import Divider from '../UI/Dividers/Divider';
import IconButton from '../UI/Buttons/IconButton';
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

const MaterialsList = ({ materials, search, loading }) => {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [attachments, setAttachments] = useState(initAttachments);
  const paletteColor = useSelector((state) => state.palette.color);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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

  return (
    <Box>
      <TransitionGroup>
        {Object.keys(materials).map((key) => (
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
                <Stack component={TransitionGroup} spacing={1.5}>
                  {materials[key]
                    .slice()
                    .sort((b, a) => a.date.localeCompare(b.date))
                    .map((material, index) => {
                      const idx = index + 1;
                      let type = '';
                      type += material.teacherSubjectType.type.name;
                      type += ' - ';
                      type += material.teacherSubjectType.teacher.academicTitle;
                      type += ' ';
                      type += material.teacherSubjectType.teacher.firstName;
                      type += ' ';
                      type += material.teacherSubjectType.teacher.lastName;
                      return (
                        <Collapse key={material.id}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            mb={idx !== materials[key].length ? 1.5 : 0}
                          >
                            <Stack spacing={0.5}>
                              <Typography variant="body2">
                                {`${t('materials.date')}: ${material.date}`}
                              </Typography>
                              <Typography variant="body2">
                                {`${t('materials.name')}: ${material.name}`}
                              </Typography>
                              <Typography variant="body2">
                                {`${t('materials.type')}: ${type}`}
                              </Typography>
                            </Stack>
                            <Stack>
                              <IconButton
                                tooltip={t('materials.info')}
                                onClick={handleOpenAttachments.bind(null, {
                                  files: material.files,
                                  description: material.description,
                                })}
                                open={
                                  attachments.files === material.files &&
                                  attachments.description ===
                                    material.description
                                }
                                Icon={InfoIcon}
                                defaultSize={24}
                                circleSize={34}
                                placement="left"
                              />
                              <IconButton
                                tooltip={t('global.edit')}
                                onClick={handleOpenEdit.bind(null, material)}
                                open={editing === material}
                                Icon={EditIcon}
                                defaultSize={24}
                                circleSize={34}
                                placement="left"
                              />
                            </Stack>
                          </Stack>
                          {idx !== materials[key].length && <Divider />}
                        </Collapse>
                      );
                    })}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Collapse>
        ))}
      </TransitionGroup>
      <Attachments
        attachments={attachments}
        handleClose={handleCloseAttachments}
      />
      <EditMaterial editing={editing} onClose={handleCloseEdit} />
      {!Object.keys(materials).length && search && (
        <Box sx={{ textAlign: 'center' }}>
          <Stack>
            <Typography variant="h6">{t('global.notFound')}</Typography>
            <Typography>
              {t('global.notFoundDesc', { search: search })}
            </Typography>
          </Stack>
        </Box>
      )}
      {!Object.keys(materials).length && !search && !loading && (
        <Box sx={{ textAlign: 'center' }}>
          <Stack>
            <Typography variant="h6">{t('materials.letsAdd')}</Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default MaterialsList;
