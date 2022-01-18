import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Dialog from '../UI/Modals/Dialog';
import useInput from '../../hooks/use-input';
import { setError } from '../../store/user-slice';
import FilledAlert from '../UI/Alerts/FilledAlert';
import Input100Width from '../UI/Inputs/Input100Width';
import { useAlert, wait } from '../../hooks/use-alert';
import { Add, Cancel } from '../UI/Buttons/FormButtons';
import { showSnackbar } from '../../store/palette-slice';
import addFaculty from '../../store/universities/faculties/addFaculty';

const AddFaculty = ({ universityId, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const open = !!universityId;

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
    const resultAction = await dispatch(
      addFaculty({ name: name.trim(), universityId })
    );
    const time2 = new Date().getTime();

    if (addFaculty.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'facultyAdded':
          setTimeout(() => {
            dispatch(
              showSnackbar({
                message: t('global.success'),
                time: 2000,
              })
            );
          }, 500);
          break;
        case 'facultyAlreadyExists':
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
      onClose();

      setTimeout(() => {
        setLoading(false);
        nameReset();
      }, 300);
    }, 500 - (time2 - time1));
  };

  const handleClose = () => {
    if (loading) return;

    onClose();

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
      <Dialog
        open={open}
        handleClose={handleClose}
        title={t('universities.addFaculty')}
        body={body}
        buttons={buttons}
      />
    </>
  );
};

export default AddFaculty;
