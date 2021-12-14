import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Tooltip, Stack, InputAdornment, IconButton } from '@mui/material';

import Header from '../Header';
import { wait } from '../../../hooks/use-alert.js';
import useInput from '../../../hooks/use-input.js';
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
  const [showPassword, setShowPassword] = useState(false);

  const {
    value: newPassword,
    isValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    valueChangeHandler: newPasswordChangeHandler,
    inputTouchHandler: newPasswordTouchHandler,
    reset: newPasswordReset,
  } = useInput((value) => value.trim().length >= 6);

  const forgotHandler = async (event) => {
    event.preventDefault();
    newPasswordTouchHandler();
    if (!newPasswordIsValid) return;

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
        id="password"
        label={t('global.password')}
        type={showPassword ? 'text' : 'password'}
        value={newPassword}
        onChange={newPasswordChangeHandler}
        onBlur={newPasswordTouchHandler}
        error={newPasswordHasError}
        helperText={newPasswordHasError && t('global.invalidPassword6')}
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip
                title={
                  showPassword
                    ? t('global.hidePassword')
                    : t('global.showPassword')
                }
                arrow
              >
                <IconButton
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                  sx={{ color: 'primary.light' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
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
