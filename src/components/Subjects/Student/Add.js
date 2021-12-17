import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { Stack, Box } from '@mui/material';

import useInput from '../../../hooks/use-input';
import MainModal from '../../UI/Modals/MainModal';
import { setError } from '../../../store/user-slice';
import IconButton from '../../UI/Buttons/IconButton';
import FilledAlert from '../../UI/Alerts/FilledAlert';
import { useAlert, wait } from '../../../hooks/use-alert';
import Input100Width from '../../UI/Inputs/Input100Width';
import { Add, Cancel } from '../../UI/Buttons/FormButtons';
import addTeacher from '../../../store/teachers/addTeacher';
import { showSnackbar } from '../../../store/palette-slice';

const AddSubjectS = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    showAlert,
    alertType,
    alertMessage,
    alertTitle,
    setErrorAlert,
    closeAlert,
  } = useAlert();

  const handleOpen = () => setOpen(true);

  const handleAdd = () => {};

  const handleClose = () => {
    if (loading) return;
    setOpen(false);

    setTimeout(() => {}, 300);
  };

  const body = (
    <Stack mt={3} mb={2} spacing={2}>
      <Box>
        <FilledAlert
          show={showAlert}
          severity={alertType}
          title={t(alertTitle)}
          message={t(alertMessage)}
          onCloseAlert={closeAlert}
        />
      </Box>
    </Stack>
  );

  const buttons = (
    <>
      <Cancel onClick={handleClose} disabled={loading} />
      <Add onClick={handleAdd} loading={loading} />
    </>
  );

  return (
    <>
      <IconButton
        tooltip={t('global.add')}
        onClick={handleOpen}
        open={open}
        Icon={AddIcon}
      />

      <MainModal
        open={open}
        handleClose={handleClose}
        title={t('subjects.addSubject')}
        body={body}
        buttons={buttons}
      />
    </>
  );
};

export default AddSubjectS;
