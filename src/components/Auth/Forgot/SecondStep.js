import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useAlert } from '../../../hooks/use-alert.js';
import FilledAlert from '../../UI/Alerts/FilledAlert.js';
import forgotSecond from '../../../store/auth/forgotSecond';
import SecondStepForm from './SecondStepForm';

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
      forgotSecond({ email, token, language: lang })
    );

    if (forgotSecond.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'existingAndValid':
          break;
        case 'forgotUserNotExists':
          navigate('/404');
          break;
        case 'userNotExists':
          setErrorAlert('global.error', 'auth.userNotExists');
          errorToken = true;
          break;
        case 'expiredRegistrationLink':
          setWarningAlert('global.warning', 'auth.expiredLink');
          errorToken = true;
          break;
        default:
          setErrorAlert('global.error', 'global.connectionError');
          errorToken = true;
          break;
      }
    } else {
      setErrorAlert('global.error', 'global.connectionError');
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
        <SecondStepForm
          email={email}
          token={token}
          showAlert={showAlert}
          closeAlert={closeAlert}
          setErrorAlert={setErrorAlert}
        />
      )}
      <Box>
        <FilledAlert
          show={showAlert}
          severity={alertType}
          title={t(alertTitle)}
          message={t(alertMessage)}
          onCloseAlert={!errorToken && closeAlert}
        />
      </Box>
    </>
  );
};

export default SecondStep;
