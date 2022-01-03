import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import TaskIcon from '@mui/icons-material/Task';
import InfoIcon from '@mui/icons-material/Info';
import Highlighter from 'react-highlight-words';
import { Typography, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import RestorePageIcon from '@mui/icons-material/RestorePage';

import EditHomework from './EditHomework';
import FinishHomework from './FinishHomework';
import DeleteHomework from './DeleteHomework';
import IconButton from '../UI/Buttons/IconButton';
import Attachments from '../Materials/Attachments';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from '../UI/Acordions/MainAccordion';

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

const initAttachments = {
  files: [],
  description: '',
  open: false,
};

const HomeworkList = ({ homework, search, tab }) => {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [finishing, setFinishing] = useState(null);
  const [attachments, setAttachments] = useState(initAttachments);
  const paletteColor = useSelector((state) => state.palette.color);

  const getHour = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return hours
      ? minutes
        ? t('homework.time', { h: hours, m: minutes })
        : t('homework.timeWoM', { h: hours })
      : t('homework.timeWoH', { m: minutes });
  };

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
                    textToHighlight={`${homework.deadline.split('T')[0]} - ${
                      homework.teacherSubjectType.subject.name
                    }`}
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
                      {`${t('global.date')}: ${homework.date.split('T')[0]} ${
                        homework.date.split('T')[1]
                      }`}
                    </Typography>
                    <Typography variant="body2">
                      {`${t('global.deadline')}: ${
                        homework.deadline.split('T')[0]
                      } ${homework.deadline.split('T')[1]}`}
                    </Typography>
                    <Typography variant="body2">
                      {`${t('global.type')}: ${getType(
                        homework.teacherSubjectType
                      )}`}
                    </Typography>
                    {homework.estimatedTime > 0 && (
                      <Typography variant="body2">
                        {`${t('homework.estimatedTime')}: ${getHour(
                          homework.estimatedTime
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
                      open={editing}
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
      />
    </>
  );
};

export default HomeworkList;
