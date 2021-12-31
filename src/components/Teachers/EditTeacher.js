import { useDispatch } from 'react-redux';
import { Stack, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

import useInput from '../../hooks/use-input';
import MainModal from '../UI/Modals/MainModal';
import { setError } from '../../store/user-slice';
import FilledAlert from '../UI/Alerts/FilledAlert';
import { useAlert, wait } from '../../hooks/use-alert';
import Input100Width from '../UI/Inputs/Input100Width';
import { showSnackbar } from '../../store/palette-slice';
import editTeacher from '../../store/teachers/editTeacher';
import { Cancel, Edit as EditBtn } from '../UI/Buttons/FormButtons';

const EditTeacher = ({ settings, onClose }) => {
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

  const open = !!settings;

  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputTouchHandler: firstNameTouchHandler,
    reset: firstNameReset,
  } = useInput((value) => value.trim().length >= 3 && value.trim().length < 50);

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputTouchHandler: lastNameTouchHandler,
    reset: lastNameReset,
  } = useInput((value) => value.trim().length >= 3 && value.trim().length < 50);

  const {
    value: academicTitle,
    isValid: academicTitleIsValid,
    hasError: academicTitleHasError,
    valueChangeHandler: academicTitleChangeHandler,
    inputTouchHandler: academicTitleTouchHandler,
    reset: academicTitleReset,
  } = useInput((value) => value.trim().length >= 2 && value.trim().length < 50);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputTouchHandler: emailTouchHandler,
    reset: emailReset,
  } = useInput((value) =>
    value.trim().length === 0
      ? true
      : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())
  );

  useEffect(() => {
    if (settings && settings.firstName.trim().length > 0) {
      const event = { target: { value: settings.firstName } };
      firstNameChangeHandler(event);
    }
    if (settings && settings.lastName.trim().length > 0) {
      const event = { target: { value: settings.lastName } };
      lastNameChangeHandler(event);
    }
    if (settings && settings.academicTitle.trim().length > 0) {
      const event = { target: { value: settings.academicTitle } };
      academicTitleChangeHandler(event);
    }
    if (settings && settings.email.trim().length > 0) {
      const event = { target: { value: settings.email } };
      emailChangeHandler(event);
    }
  }, [
    settings,
    firstNameChangeHandler,
    lastNameChangeHandler,
    academicTitleChangeHandler,
    emailChangeHandler,
  ]);

  const formIsValid =
    firstNameIsValid && lastNameIsValid && academicTitleIsValid && emailIsValid;

  const handleEdit = async () => {
    firstNameTouchHandler();
    lastNameTouchHandler();
    academicTitleTouchHandler();
    emailTouchHandler();

    if (!formIsValid) return;
    setLoading(true);
    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    const time1 = new Date().getTime();

    const resultAction = await dispatch(
      editTeacher({
        id: settings.id,
        academicTitle,
        firstName,
        lastName,
        email,
      })
    );

    const time2 = new Date().getTime();

    if (editTeacher.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'teacherEdited':
          setTimeout(() => {
            dispatch(
              showSnackbar({
                message: t('global.success'),
                time: 2000,
              })
            );
          }, 500);
          break;
        case 'emailNotValid':
          setErrorAlert('global.error', 'auth.invalidEmail');
          setLoading(false);
          return;
        case 'tokenNotValid':
        case 'teacherNotExists':
        case 'firstNameNotValid':
        case 'lastNameNotValid':
        case 'academicTitleNotValid':
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
      firstNameReset();
      lastNameReset();
      academicTitleReset();
      emailReset();
      closeAlert();
    }, 300);
  };

  const body = (
    <Stack mt={3} mb={2} spacing={2}>
      <Input100Width
        id="firstName"
        label={t('teachers.firstName')}
        value={firstName}
        onChange={firstNameChangeHandler}
        onBlur={firstNameTouchHandler}
        error={firstNameHasError}
        helperText={
          firstNameHasError &&
          t('global.incorrectEntryChar', { min: 3, max: 50 })
        }
        disabled={loading}
      />

      <Input100Width
        id="lastName"
        label={t('teachers.lastName')}
        value={lastName}
        onChange={lastNameChangeHandler}
        onBlur={lastNameTouchHandler}
        error={lastNameHasError}
        helperText={
          lastNameHasError &&
          t('global.incorrectEntryChar', { min: 3, max: 50 })
        }
        disabled={loading}
      />

      <Input100Width
        id="academicTitle"
        label={t('teachers.academicTitle')}
        value={academicTitle}
        onChange={academicTitleChangeHandler}
        onBlur={academicTitleTouchHandler}
        error={academicTitleHasError}
        helperText={
          academicTitleHasError &&
          t('global.incorrectEntryChar', { min: 2, max: 50 })
        }
        disabled={loading}
      />

      <Input100Width
        id="email"
        label={t('global.email')}
        value={email}
        onChange={emailChangeHandler}
        onBlur={emailTouchHandler}
        error={emailHasError}
        helperText={emailHasError && t('global.incorrectEntry')}
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
      <EditBtn onClick={handleEdit} loading={loading} />
    </>
  );

  return (
    <MainModal
      open={open}
      handleClose={handleClose}
      title={t('teachers.editTeacher')}
      body={body}
      buttons={buttons}
    />
  );
};

export default EditTeacher;
