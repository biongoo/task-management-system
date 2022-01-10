import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Stack, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Header from '../Header';
import { wait } from '../../../hooks/use-alert.js';
import useInput from '../../../hooks/use-input.js';
import IconButton from '../../UI/Buttons/IconButton';
import Input100Width from '../../UI/Inputs/Input100Width';
import forgotThird from '../../../store/auth/forgotThird.js';
import LoadingButton100Width from '../../UI/Buttons/LoadingButton100Width.js';

const SecondStepForm = ({
  email,
  token,
  showAlert,
  closeAlert,
  setErrorAlert,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    value: newPassword,
    isValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    valueChangeHandler: newPasswordChangeHandler,
    inputTouchHandler: newPasswordTouchHandler,
    reset: newPasswordReset,
  } = useInput((value) => value.trim().length >= 6);

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputTouchHandler: confirmPasswordTouchHandler,
    reset: confirmPasswordReset,
  } = useInput((value) => value === newPassword);

  const formIsValid = newPasswordIsValid && confirmPasswordIsValid;

  const forgotHandler = async (event) => {
    event.preventDefault();
    newPasswordTouchHandler();
    confirmPasswordTouchHandler();
    if (!formIsValid) return;

    setLoading(true);
    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    const resultAction = await dispatch(
      forgotThird({ email, token, newPassword })
    );

    setLoading(false);
    newPasswordReset();
    confirmPasswordReset();

    if (forgotThird.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'newPasswordSet':
          navigate('/forgot/thirdstep');
          break;
        case 'forgotUserNotExists':
          setErrorAlert('global.error', 'register.registrationUserNotExists');
          break;
        case 'userNotExists':
          setErrorAlert('global.error', 'auth.userNotExists');
          break;
        case 'invalidPassword':
          setErrorAlert('global.error', 'global.invalidPassword');
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
    <Stack spacing={2} mb={2}>
      <Header header={'auth.title2'} subHeader={'auth.enterDetails'} />

      <Input100Width
        id="newPassword"
        label={t('settings.newPassword')}
        type={showNewPassword ? 'text' : 'password'}
        value={newPassword}
        onChange={newPasswordChangeHandler}
        onBlur={newPasswordTouchHandler}
        error={newPasswordHasError}
        helperText={newPasswordHasError && t('global.invalidPassword6')}
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                tooltip={
                  showNewPassword
                    ? t('global.hidePassword')
                    : t('global.showPassword')
                }
                onClick={() => setShowNewPassword((prevState) => !prevState)}
                Icon={showNewPassword ? VisibilityOff : Visibility}
              />
            </InputAdornment>
          ),
        }}
      />

      <Input100Width
        id="confirmPassword"
        label={t('settings.confirmPassword')}
        type={showConfirmPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={confirmPasswordChangeHandler}
        onBlur={confirmPasswordTouchHandler}
        error={confirmPasswordHasError}
        helperText={confirmPasswordHasError && t('global.incorrectEntry')}
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                tooltip={
                  showConfirmPassword
                    ? t('global.hidePassword')
                    : t('global.showPassword')
                }
                onClick={() =>
                  setShowConfirmPassword((prevState) => !prevState)
                }
                Icon={showConfirmPassword ? VisibilityOff : Visibility}
              />
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton100Width onClick={forgotHandler} loading={loading}>
        {t('forgot.forgot')}
      </LoadingButton100Width>
    </Stack>
  );
};

export default SecondStepForm;
