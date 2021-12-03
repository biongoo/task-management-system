import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';

import useInput from '../../../hooks/use-input.js';
import { useAlert, wait } from '../../../hooks/use-alert.js';
import FilledAlert from '../../UI/Alerts/FilledAlert.js';
import forgotFirst from '../../../store/auth/forgotFirst.js';
import Input100Width from '../../UI/Inputs/Input100Width.js';
import LoadingButton100Width from '../../UI/Buttons/LoadingButton100Width.js';
import Header from '../Header';

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
      forgotFirst({ email, language: i18n.language })
    );

    setLoading(false);
    emailReset();

    if (forgotFirst.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'emailSent':
          setSuccessAlert('global.success', 'forgot.emailSent');
          break;
        case 'userExists':
          setWarningAlert('global.warning', 'forgot.userExists');
          break;
        case 'invalidEmail':
          setErrorAlert('global.error', 'auth.invalidEmail');
          break;
        case 'userNotExists':
          setErrorAlert('global.error', 'auth.userNotExists');
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
      <Header header={'forgot.title'} subHeader={'auth.enterEmail'} />

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
          {t('forgot.forgot')}
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
