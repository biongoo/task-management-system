import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Stack, Typography, Collapse } from '@mui/material';

import AddItem from './AddItem';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import Dialog from '../UI/Modals/Dialog';
import Divider from '../UI/Dividers/Divider';
import IconButton from '../UI/Buttons/IconButton';

const EditDay = ({ openDay, onClose }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [thisDay, setThisDay] = useState({ items: [], number: 0 });

  const { items, number } = thisDay;

  useEffect(() => {
    if (openDay && openDay.number > 0) {
      setThisDay({ items: openDay.day, number: openDay.number });
      setOpen(true);
    }
  }, [openDay]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleOpenAdd = () => {
    setOpen(false);
    setTimeout(() => setOpenAdd(true), 250);
  };

  const handleCloseAdd = (item) => {
    if (item && item !== 'backdropClick') {
      let flag = false;

      for (const [index, element] of openDay.day.entries()) {
        if (element.startTime.localeCompare(item.startTime) >= 0) {
          openDay.day.splice(index, 0, item);
          flag = true;
          break;
        }
      }

      if (!flag) {
        openDay.day.push(item);
      }
    }

    setOpenAdd(false);
    setTimeout(() => setOpen(true), 250);
  };

  const handleOpenEdit = (item) => {
    setOpen(false);
    setTimeout(() => setOpenEdit(item), 250);
  };

  const handleCloseEdit = (item) => {
    if (item && item !== 'backdropClick') {
      const index = openDay.day.findIndex((element) => element.id === item.id);
      openDay.day[index] = item;
    }

    setOpenEdit(false);
    setTimeout(() => setOpen(true), 250);
  };

  const handleOpenDelete = (item) => {
    setOpen(false);
    setTimeout(() => setOpenDelete(item), 250);
  };

  const handleCloseDelete = (id) => {
    if (id && id !== 'backdropClick') {
      openDay.day.splice(
        openDay.day.findIndex((element) => element.id === id),
        1
      );
    }

    setOpenDelete(false);
    setTimeout(() => setOpen(true), 250);
  };

  const body = (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <IconButton
        tooltip={t('global.add')}
        onClick={handleOpenAdd}
        open={false}
        Icon={AddCircleIcon}
        defaultSize={36}
      />
      <Box sx={{ width: '100%' }}>
        <TransitionGroup>
          {items.map((item, idx) => {
            let time = '';
            time += item.startTime.slice(0, 5);
            time += ' - ';
            time += item.endTime.slice(0, 5);

            let repetition = '';
            if (item.repetition !== 0) {
              repetition += ' (';
              repetition += t(`plan.week${item.repetition}`);
              repetition += ')';
            }

            let teacher = '';
            let subject = '';
            let type = '';
            let name = '';

            if (item.teacherSubjectType) {
              subject += item.teacherSubjectType.subject.name;
              if (item.teacherSubjectType.teacher) {
                teacher += item.teacherSubjectType.teacher.academicTitle;
                teacher += ' ';
                teacher += item.teacherSubjectType.teacher.firstName;
                teacher += ' ';
                teacher += item.teacherSubjectType.teacher.lastName;
              }
              type += item.teacherSubjectType.type.name;
            }

            if (item.name) {
              name += item.name;
            }

            return (
              <Collapse key={idx}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  pl={{ xs: 0, sm: 1.5 }}
                  spacing={{ xs: 0.5, md: 2 }}
                  pt={0.5}
                  pb={1}
                >
                  <Box mt={1} sx={{ wordBreak: 'normal' }}>
                    <Typography variant="body1" sx={{ display: 'inline' }}>
                      {time}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'inline' }}>
                      {repetition}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {subject}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {teacher}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {type}
                    </Typography>
                  </Box>
                  <Stack direction="row">
                    <IconButton
                      tooltip={t('global.edit')}
                      onClick={handleOpenEdit.bind(null, item)}
                      open={false}
                      Icon={EditIcon}
                      defaultSize={24}
                    />
                    <IconButton
                      tooltip={t('global.delete')}
                      onClick={handleOpenDelete.bind(null, item)}
                      open={false}
                      Icon={DeleteIcon}
                      defaultSize={24}
                    />
                  </Stack>
                </Stack>
                {++idx !== items.length && <Divider />}
              </Collapse>
            );
          })}
        </TransitionGroup>
      </Box>
    </Stack>
  );

  return (
    <>
      <Dialog
        open={open}
        handleClose={handleClose}
        title={t(`plan.day${number}`)}
        body={body}
      />
      <AddItem open={openAdd} onClose={handleCloseAdd} number={number} />
      <EditItem editing={openEdit} onClose={handleCloseEdit} />
      <DeleteItem deleting={openDelete} onClose={handleCloseDelete} />
    </>
  );
};

export default EditDay;
