import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useAlert } from '../../hooks/use-alert.js';
import FilledAlert from '../UI/Alerts/FilledAlert.js';
import signUpSecond from '../../store/auth/signUpSecond';
import SecondStepForm from './SecondStepForm';
import Header from './Header';

let errorToken = false;
let languageFlag = true;
let lang = 'en';

const SecondStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { email, token } = useParams();

  const [loading, setLoading] = useState(false);
  const {
    showAlert,
    alertType,
    alertMessage,
    alertTitle,
    setErrorAlert,
    setWarningAlert,
    closeAlert,
  } = useAlert();

  if (languageFlag) {
    lang = i18n.language;
    languageFlag = false;
  }

  const checkToken = useCallback(async () => {
    setLoading(true);
    const resultAction = await dispatch(
      signUpSecond({ email, token, language: lang })
    );

    if (signUpSecond.fulfilled.match(resultAction)) {
      console.log(resultAction.payload);
      if (resultAction.payload.message === 'registrationUserNotExists') {
        navigate('/404');
      } else if (resultAction.payload.message === 'expiredRegistrationLink') {
        setWarningAlert('signUp.errorTitle', 'signUp.expiredRegistrationLink');
        errorToken = true;
      } else if (resultAction.payload.message === 'userExists') {
        setErrorAlert('signUp.errorTitle', 'signUp.userExists');
        errorToken = true;
      }
    } else {
      setErrorAlert('signUp.errorTitle', 'signUp.connectionError');
      errorToken = true;
    }

    setLoading(false);
  }, [dispatch, navigate, setErrorAlert, setWarningAlert, email, token]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <>
      {loading && !errorToken && (
        <Box mb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
      {!loading && !errorToken && (
        <>
          <Header header={'signUp.title2'} subHeader={'signUp.enterDetails'} />
          <SecondStepForm
            email={email}
            token={token}
            showAlert={showAlert}
            closeAlert={closeAlert}
            setErrorAlert={setErrorAlert}
          />
        </>
      )}
      <FilledAlert
        show={showAlert}
        severity={alertType}
        title={t(alertTitle)}
        message={t(alertMessage)}
        onCloseAlert={!errorToken && closeAlert}
      />
    </>
  );
};

export default SecondStep;
