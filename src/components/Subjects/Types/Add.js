import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useInput from '../../../hooks/use-input';
import MainModal from '../../UI/Modals/MainModal';
import { setError } from '../../../store/user-slice';
import addType from '../../../store/subjects/addType';
import Input100Width from '../../UI/Inputs/Input100Width';
import { showSnackbar } from '../../../store/palette-slice';
import { Add as AddBtn, Cancel } from '../../UI/Buttons/FormButtons';
import { useAlert, wait } from '../../../hooks/use-alert';
import FilledAlert from '../../UI/Alerts/FilledAlert';

const Add = ({ open, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
  } = useInput((value) => value.trim().length >= 2 && value.trim().length < 50);

  const formIsValid = nameIsValid;

  const handleAdd = async () => {
    nameTouchHandler();

    if (!formIsValid) return;
    setLoading(true);
    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    const time1 = new Date().getTime();
    const resultAction = await dispatch(addType({ name }));
    const time2 = new Date().getTime();

    if (addType.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'typeAdded':
          setTimeout(() => {
            dispatch(
              showSnackbar({
                message: t('global.success'),
                time: 2000,
              })
            );
          }, 500);
          break;
        case 'typeExists':
          setErrorAlert('global.error', 'subjects.typeExists');
          setLoading(false);
          return;
        case 'tokenNotValid':
        case 'nameNotValid':
        default:
          dispatch(setError(t('global.expiredSession')));
          break;
      }
    } else {
      dispatch(setError(t('global.expiredSession')));
    }

    setTimeout(() => {
      handleClose();
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 500 - (time2 - time1));
  };

  const handleClose = () => {
    if (loading) return;

    onClose();

    setTimeout(() => {
      nameReset();
    }, 300);
  };

  const body = (
    <Stack my={3} spacing={2}>
      <Input100Width
        id="firstName"
        label={t('global.name')}
        value={name}
        onChange={nameChangeHandler}
        onBlur={nameTouchHandler}
        error={nameHasError}
        helperText={
          nameHasError && t('global.incorrectEntryChar', { min: 2, max: 50 })
        }
        disabled={loading}
      />
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
      <AddBtn onClick={handleAdd} loading={loading} />
    </>
  );

  return (
    <MainModal
      open={open}
      handleClose={handleClose}
      title={t('subjects.addType')}
      body={body}
      buttons={buttons}
    />
  );
};

export default Add;
