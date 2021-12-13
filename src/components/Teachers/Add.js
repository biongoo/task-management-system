import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { IconButton, Stack } from '@mui/material';

import useInput from '../../hooks/use-input';
import MainModal from '../UI/Modals/MainModal';
import { setError } from '../../store/user-slice';
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
    }, 300);
  };

  const handleAdd = async () => {
    firstNameTouchHandler();
    lastNameTouchHandler();
    academicTitleTouchHandler();
    emailTouchHandler();

    if (!formIsValid) return;
    setLoading(true);

    const time1 = new Date().getTime();

    const resultAction = await dispatch(
      addTeacher({ firstName, lastName, academicTitle, email })
    );

    const time2 = new Date().getTime();

    setTimeout(() => {
      handleClose();
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 500 - (time2 - time1));

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
          setTimeout(() => {
            dispatch(
              showSnackbar({
                message: t('auth.invalidEmail'),
                variant: 'error',
              })
            );
          }, 500);
          break;
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
  };

  const body = (
    <>
      <Stack sx={{ mb: 4 }}>
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
      </Stack>
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
        onClick={handleOpen}
        color="secondary"
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.secondary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <AddIcon
          sx={{
            width: 28,
            height: 28,
            color: open ? 'secondary.main' : 'primary.light',
          }}
        />
      </IconButton>

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
