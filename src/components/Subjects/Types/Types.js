import React, { useState } from 'react';
/* import { useDispatch } from 'react-redux'; */
import Collapse from '@mui/material/Collapse';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Stack, Typography } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import Add from './Add';
import MainModal from '../../UI/Modals/MainModal';
import MainDivider from '../../UI/Dividers/Divider';
import IconButton from '../../UI/Buttons/IconButton';

const Types = ({ types }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

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

  const removeType = (id) => {
    console.log(id);
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
                    onClick={removeType.bind(null, type.id)}
                    open={false}
                    Icon={EditIcon}
                    defaultSize={24}
                  />
                  <IconButton
                    tooltip={t('global.delete')}
                    onClick={removeType.bind(null, type.id)}
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
    </>
  );
};

export default Types;
