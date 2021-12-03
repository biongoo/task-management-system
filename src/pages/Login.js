import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Stack,
  FormControlLabel,
  Checkbox,
  Link,
  Divider,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import loginAsync from '../store/auth/login.js';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { login } from '../store/auth-slice';
import useInput from '../hooks/use-input.js';
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
      const { email, token } = resultAction.payload;

      switch (resultAction.payload.message) {
        case 'userLoggedIn':
          dispatch(login({ email, token, rememberPassword }));
          dispatch(showSnackbar({ message: t('login.successLogin'), time: 3000 }));
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
    <>
      <Stack spacing={1}>
        <Typography variant="h5">{t('login.title')}</Typography>
        <Typography variant="body2" color="primary.light">
          {t('auth.enterDetails')}
        </Typography>
      </Stack>
      <Box pt={1}>
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
          helperText={passwordHasError && t('global.incorrectEntry')}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                  sx={{ color: 'primary.light' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 1 }}
      >
        <FormControlLabel
          label={t('login.rememberMe')}
          control={<Checkbox defaultChecked color="secondary" />}
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
      <Stack spacing={2} mt={1}>
        <LoadingButton100Width onClick={signInHandler} loading={loading}>
          {t('auth.signIn')}
        </LoadingButton100Width>

        <Divider
          sx={{ '&::before,&::after': { borderColor: 'primary.light' } }}
        >
          {t('global.or')}
        </Divider>

        <LinkButton100Width to="/signup">{t('auth.signUp')}</LinkButton100Width>
      </Stack>
    </>
  );
};

export default Login;
