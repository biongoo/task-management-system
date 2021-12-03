import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';

import useInput from '../../../hooks/use-input.js';
import { useAlert, wait } from '../../../hooks/use-alert.js';
import FilledAlert from '../../UI/Alerts/FilledAlert.js';
import registerFirst from '../../../store/auth/registerFirst.js';
import Input100Width from '../../UI/Inputs/Input100Width.js';
import LoadingButton100Width from '../../UI/Buttons/LoadingButton100Width.js';
import Header from '../Header.js';

const FirstStep = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const {
    showAlert,
    alertType,
    alertMessage,
    alertTitle,
    setSuccessAlert,
    setWarningAlert,
    setErrorAlert,
    closeAlert,
  } = useAlert();

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
    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    const resultAction = await dispatch(
      registerFirst({ email, language: i18n.language })
    );

    setLoading(false);
    emailReset();

    if (registerFirst.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'registrationUserAdded':
          setSuccessAlert('global.success', 'register.registrationUserAdded');
          break;
        case 'registrationUserExists':
          setWarningAlert('global.warning', 'register.registrationUserExists');
          break;
        case 'invalidEmail':
          setErrorAlert('global.error', 'auth.invalidEmail');
          break;
        case 'userExists':
          setErrorAlert('global.error', 'register.userExists');
          break;
        default:
          setErrorAlert('global.error', 'global.connectionError');
          break;
      }
    } else {
      setErrorAlert('global.error', 'global.connectionError');
    }
  };

  return (
    <>
      <Header header={'register.title'} subHeader={'auth.enterEmail'} />

      <Stack spacing={2} pt={1} mb={2}>
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

        <LoadingButton100Width onClick={signUpHandler} loading={loading}>
          {t('auth.signUp')}
        </LoadingButton100Width>
      </Stack>

      <FilledAlert
        show={showAlert}
        severity={alertType}
        title={t(alertTitle)}
        message={t(alertMessage)}
        onCloseAlert={closeAlert}
      />
    </>
  );
};

export default FirstStep;
