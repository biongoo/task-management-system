import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Stack, Typography } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';
import MainModal from '../../UI/Modals/MainModal';
import MainDivider from '../../UI/Dividers/Divider';
import IconButton from '../../UI/Buttons/IconButton';

const Types = ({ types }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenAdd = () => {
    setOpen(false);
    setTimeout(() => setOpenAdd(true), 250);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setTimeout(() => setOpen(true), 250);
  };

  const handleOpenEdit = (type) => {
    setOpen(false);
    setTimeout(() => setOpenEdit(type), 250);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setTimeout(() => setOpen(true), 250);
  };

  const handleOpenDelete = (type) => {
    setOpen(false);
    setTimeout(() => setOpenDelete(type), 250);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setTimeout(() => setOpen(true), 250);
  };

  const body = (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <IconButton
        tooltip={t('subjects.addType')}
        onClick={handleOpenAdd}
        open={false}
        Icon={AddCircleIcon}
        defaultSize={36}
      />
      <Box sx={{ width: '100%', mb: 2 }}>
        <TransitionGroup>
          {types.map((type) => (
            <Collapse key={type.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                pl={1.5}
                spacing={2}
                py={0.5}
              >
                <Typography sx={{ wordBreak: 'break-all' }}>
                  {type.name}
                </Typography>
                <Stack direction="row">
                  <IconButton
                    tooltip={t('global.edit')}
                    onClick={handleOpenEdit.bind(null, type)}
                    open={false}
                    Icon={EditIcon}
                    defaultSize={24}
                  />
                  <IconButton
                    tooltip={t('global.delete')}
                    onClick={handleOpenDelete.bind(null, type)}
                    open={false}
                    Icon={DeleteIcon}
                    defaultSize={24}
                  />
                </Stack>
              </Stack>
              <MainDivider />
            </Collapse>
          ))}
        </TransitionGroup>
      </Box>
    </Stack>
  );

  return (
    <>
      <IconButton
        tooltip={t('subjects.types')}
        onClick={handleOpen}
        open={open}
        Icon={FormatListBulletedIcon}
      />

      <MainModal
        open={open}
        handleClose={handleClose}
        title={t('subjects.types')}
        body={body}
      />

      <Add open={openAdd} onClose={handleCloseAdd} />
      <Edit type={openEdit} onClose={handleCloseEdit} />
      <Delete type={openDelete} onClose={handleCloseDelete} />
    </>
  );
};

export default Types;
