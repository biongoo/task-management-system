import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import loginAsync from '../store/auth/login.js';
import { Link as RouterLink } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  InputAdornment,
  IconButton,
  Stack,
  FormControlLabel,
  Checkbox,
  Link,
  Divider,
  Tooltip,
} from '@mui/material';

import { login } from '../store/auth-slice';
import useInput from '../hooks/use-input.js';
import Header from '../components/Auth/Header.js';
import { useAlert, wait } from '../hooks/use-alert';
import { showSnackbar } from '../store/palette-slice.js';
import FilledAlert from '../components/UI/Alerts/FilledAlert';
import Input100Width from '../components/UI/Inputs/Input100Width.js';
import LinkButton100Width from '../components/UI/Buttons/LinkButton100Width.js';
import LoadingButton100Width from '../components/UI/Buttons/LoadingButton100Width.js';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(true);

  const {
    showAlert,
    alertType,
    alertMessage,
    alertTitle,
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

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputTouchHandler: passwordTouchHandler,
    reset: passwordReset,
  } = useInput((value) => value.trim() !== '');

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) formIsValid = true;

  const signInHandler = async (event) => {
    event.preventDefault();

    emailTouchHandler();
    passwordTouchHandler();

    if (!formIsValid) return;

    setLoading(true);
    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    const resultAction = await dispatch(loginAsync({ email, password }));

    setLoading(false);
    emailReset();
    passwordReset();

    if (loginAsync.fulfilled.match(resultAction)) {
      const { email, token, type } = resultAction.payload;

      switch (resultAction.payload.message) {
        case 'userLoggedIn':
          dispatch(login({ email, token, type, rememberPassword }));
          dispatch(
            showSnackbar({ message: t('login.successLogin'), time: 3000 })
          );
          break;
        case 'userNotExists':
          setErrorAlert('global.error', 'auth.userNotExists');
          break;
        case 'wrongPassword':
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
    <Stack spacing={2}>
      <Header header={'login.title'} subHeader={'auth.enterDetails'} noBack />

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

      <Input100Width
        id="password"
        label={t('global.password')}
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={passwordChangeHandler}
        onBlur={passwordTouchHandler}
        error={passwordHasError}
        helperText={passwordHasError && t('global.invalidPassword')}
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

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <FormControlLabel
          label={t('login.rememberMe')}
          control={<Checkbox checked={rememberPassword} color="secondary" />}
          onChange={(event) => setRememberPassword(event.target.checked)}
        />

        <Link
          component={RouterLink}
          to="/forgot"
          variant="subtitle2"
          color="secondary"
        >
          {t('login.forgot')}
        </Link>
      </Stack>

      <FilledAlert
        show={showAlert}
        severity={alertType}
        title={t(alertTitle)}
        message={t(alertMessage)}
        onCloseAlert={closeAlert}
      />

      <LoadingButton100Width onClick={signInHandler} loading={loading}>
        {t('auth.signIn')}
      </LoadingButton100Width>

      <Divider sx={{ '&::before,&::after': { borderColor: 'primary.light' } }}>
        {t('global.or')}
      </Divider>

      <LinkButton100Width to="/signup">{t('auth.signUp')}</LinkButton100Width>
    </Stack>
  );
};

export default Login;
