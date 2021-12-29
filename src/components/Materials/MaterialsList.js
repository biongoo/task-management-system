import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import Highlighter from 'react-highlight-words';
import { Typography, Box, Stack } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '../UI/Acordions/MainAccordion';
/* import EditSubject from './Edit';
import DeleteSubject from './Delete'; */
import IconButton from '../UI/Buttons/IconButton';
import Divider from '../UI/Dividers/Divider';

const MaterialsList = ({ materials, search, loading }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  /* const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null); */
  const paletteColor = useSelector((state) => state.palette.color);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <TransitionGroup>
        {Object.keys(materials).map((key, index) => (
          <Collapse key={index}>
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
                      /* console.log(material); */
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
                                tooltip={t('materials.attachments')}
                                /* onClick={handleOpenEdit.bind(null, item)} */
                                open={false}
                                Icon={AttachFileIcon}
                                defaultSize={24}
                                circleSize={34}
                              />
                              <IconButton
                                tooltip={t('global.edit')}
                                /* onClick={handleOpenEdit.bind(null, item)} */
                                open={false}
                                Icon={EditIcon}
                                defaultSize={24}
                                circleSize={34}
                              />
                            </Stack>
                          </Stack>
                          {idx !== materials[key].length && <Divider />}
                        </Collapse>
                      );
                    })}
                  {/* {subject.teacherSubjectTypes.length ? (
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
                    )} */}
                </Stack>
                {/* <Stack direction="row">
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
              </Stack> */}
              </AccordionDetails>
            </Accordion>
          </Collapse>
        ))}
      </TransitionGroup>
    </Box>
  );
};

export default MaterialsList;
