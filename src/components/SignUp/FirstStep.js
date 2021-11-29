import React, { useState, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography, Stack, IconButton } from '@mui/material';

import useInput from '../../hooks/use-input.js';
import FilledAlert from '../UI/Alerts/FilledAlert.js';
import signUpFirst from '../../store/auth/signUpFirst.js';
import Input100Width from '../UI/Inputs/Input100Width.js';
import LoadingButton100Width from '../UI/Buttons/LoadingButton100Width.js';

const initOutput = { type: 'success', title: '', message: '' };

const outputReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        show: true,
        type: 'error',
        title: action.title,
        message: action.message,
      };
    case 'SET_WARNING':
      return {
        show: true,
        type: 'warning',
        title: action.title,
        message: action.message,
      };
    case 'SET_SUCCESS':
      return {
        show: true,
        type: 'success',
        title: action.title,
        message: action.message,
      };
    case 'EXIT':
      return { ...state, show: false };
    default:
      throw new Error();
  }
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const FirstStep = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [output, dispatchOutput] = useReducer(outputReducer, initOutput);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputTouchHandler: emailTouchHandler,
    reset: emailReset,
  } = useInput((value) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())
  );

  const signUpHandler = async (event) => {
    event.preventDefault();

    emailTouchHandler();
    if (!emailIsValid) return;

    setLoading(true);
    dispatchOutput({ type: 'EXIT' });
    await delay(250);

    const resultAction = await dispatch(
      signUpFirst({ email, language: i18n.language })
    );

    setLoading(false);
    emailReset();

    if (signUpFirst.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'registrationUserAdded':
          dispatchOutput({
            type: 'SET_SUCCESS',
            title: 'signUp.successTitle',
            message: 'signUp.registrationUserAdded',
          });
          break;
        case 'registrationUserExists':
          dispatchOutput({
            type: 'SET_WARNING',
            title: 'signUp.errorTitle',
            message: 'signUp.registrationUserExists',
          });
          break;
        case 'invalidEmail':
        case 'userExists':
          dispatchOutput({
            type: 'SET_ERROR',
            title: 'signUp.errorTitle',
            message: `signUp.${resultAction.payload.message}`,
          });
          break;
        default:
          dispatchOutput({
            type: 'SET_ERROR',
            title: 'signUp.errorTitle',
            message: `signUp.connectionError`,
          });
          break;
      }
    } else {
      dispatchOutput({
        type: 'SET_ERROR',
        title: 'signUp.errorTitle',
        message: 'signUp.connectionError',
      });
    }
  };
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">{t('signUp.title')}</Typography>
        <IconButton component={RouterLink} to="/" color="warning">
          <ArrowBackIcon sx={{ height: '35px', width: '35px' }} />
        </IconButton>
      </Stack>
      <Typography variant="body2" color="primary.light">
        {t('signUp.enterEmail')}
      </Typography>

      <Stack spacing={2} pt={1} mb={2}>
        <Input100Width
          id="email"
          label={t('signUp.email')}
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailTouchHandler}
          error={emailHasError}
          helperText={emailHasError && t('signUp.incorrectEntry')}
          disabled={loading}
        />

        <LoadingButton100Width onClick={signUpHandler} loading={loading}>
          {t('signUp.signUp')}
        </LoadingButton100Width>
      </Stack>
      <FilledAlert
        show={output.show}
        severity={output.type}
        title={t(output.title)}
        message={t(output.message)}
        onCloseAlert={() => dispatchOutput({ type: 'EXIT' })}
      />
    </>
  );
};

export default FirstStep;
