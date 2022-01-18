import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import Dialog from '../UI/Modals/Dialog';
import useInput from '../../hooks/use-input';
import { setError } from '../../store/user-slice';
import IconButton from '../UI/Buttons/IconButton';
import FilledAlert from '../UI/Alerts/FilledAlert';
import Input100Width from '../UI/Inputs/Input100Width';
import { useAlert, wait } from '../../hooks/use-alert';
import { Add, Cancel } from '../UI/Buttons/FormButtons';
import { showSnackbar } from '../../store/palette-slice';
import addUniversity from '../../store/universities/addUniversity';

const AddUniversity = () => {
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

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputTouchHandler: nameTouchHandler,
    reset: nameReset,
  } = useInput(
    (value) => value.trim().length > 0 && value.trim().length <= 200
  );

  const formIsValis = nameIsValid;

  const handleAdd = async () => {
    nameTouchHandler();
    if (!formIsValis) return;

    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    setLoading(true);

    const time1 = new Date().getTime();
    const resultAction = await dispatch(addUniversity({ name: name.trim() }));
    const time2 = new Date().getTime();

    if (addUniversity.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'universityAdded':
          setTimeout(() => {
            dispatch(
              showSnackbar({
                message: t('global.success'),
                time: 2000,
              })
            );
          }, 500);
          break;
        case 'universityAlreadyExists':
          setErrorAlert('global.error', t('global.nameInUse'));
          setLoading(false);
          return;
        default:
          dispatch(setError(t('global.expiredSession')));
          break;
      }
    } else {
      dispatch(setError(t('global.expiredSession')));
    }

    setTimeout(() => {
      setOpen(false);

      setTimeout(() => {
        setLoading(false);
        nameReset();
      }, 300);
    }, 500 - (time2 - time1));
  };

  const handleClose = () => {
    if (loading) return;

    setOpen(false);

    setTimeout(() => {
      nameReset();
      closeAlert();
    }, 300);
  };

  const body = (
    <>
      <Box my={1}>
        <Input100Width
          id="name"
          label={t('global.name')}
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameTouchHandler}
          error={nameHasError}
          helperText={
            nameHasError && t('global.incorrectEntryChar', { min: 1, max: 200 })
          }
          disabled={loading}
        />
      </Box>
      <Box mt={1}>
        <FilledAlert
          show={showAlert}
          severity={alertType}
          title={t(alertTitle)}
          message={alertMessage}
          onCloseAlert={closeAlert}
        />
      </Box>
    </>
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
        tooltip={t('universities.addUniversity')}
        onClick={() => setOpen(true)}
        open={open}
        Icon={AddIcon}
      />
      <Dialog
        open={open}
        handleClose={handleClose}
        title={t('universities.addUniversity')}
        body={body}
        buttons={buttons}
      />
    </>
  );
};

export default AddUniversity;
