import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import useInput from '../../hooks/use-input';
import MainModal from '../UI/Modals/MainModal';
import { setError } from '../../store/user-slice';
import IconButton from '../UI/Buttons/IconButton';
import FilledAlert from '../UI/Alerts/FilledAlert';
import { useAlert, wait } from '../../hooks/use-alert';
import Input100Width from '../UI/Inputs/Input100Width';
import { Add, Cancel } from '../UI/Buttons/FormButtons';
import addTeacher from '../../store/teachers/addTeacher';
import { showSnackbar } from '../../store/palette-slice';

const AddTeacher = () => {
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

  const formIsValid =
    firstNameIsValid && lastNameIsValid && academicTitleIsValid && emailIsValid;

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    if (loading) return;

    setOpen(false);

    setTimeout(() => {
      firstNameReset();
      lastNameReset();
      academicTitleReset();
      emailReset();
      closeAlert();
    }, 300);
  };

  const handleAdd = async () => {
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
      addTeacher({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        academicTitle: academicTitle.trim(),
        email: email.trim(),
      })
    );

    const time2 = new Date().getTime();

    if (addTeacher.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'teacherAdded':
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
        case 'typeNotValid':
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
        title={t('teachers.addTeacher')}
        body={body}
        buttons={buttons}
      />
    </>
  );
};

export default AddTeacher;
