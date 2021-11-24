import React, { useState } from 'react';
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
  Button,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import useInput from '../hooks/use-input.js';
import AuthInput from '../components/UI/Inputs/AuthInput.js';

const Login = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(true);

  const {
    value: login,
    isValid: loginIsValid,
    hasError: loginHasError,
    valueChangeHandler: loginChangeHandler,
    inputTouchHandler: loginTouchHandler,
    reset: loginReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputTouchHandler: passwordTouchHandler,
    reset: passwordReset,
  } = useInput((value) => value.trim() !== '');

  let formIsValid = false;

  if (loginIsValid && passwordIsValid) formIsValid = true;

  const signInHandler = (event) => {
    event.preventDefault();

    loginTouchHandler();
    passwordTouchHandler();

    if (!formIsValid) return;

    setLoading(true);

    console.log(login, password, rememberPassword);

    loginReset();
    passwordReset();
  };

  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h5">{t('signIn.title')}</Typography>
        <Typography variant="body2" color="primary.light">
          {t('signIn.enterDetails')}
        </Typography>
      </Stack>

      <Box pt={1}>
        <AuthInput
          id="login"
          variant="outlined"
          label={t('signIn.login')}
          value={login}
          onChange={loginChangeHandler}
          onBlur={loginTouchHandler}
          error={loginHasError}
          helperText={loginHasError && t('signIn.incorrectEntry')}
          noValidate
          autoComplete="off"
        />
        <AuthInput
          id="password"
          variant="outlined"
          label={t('signIn.password')}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordTouchHandler}
          error={passwordHasError}
          helperText={passwordHasError && t('signIn.incorrectEntry')}
          noValidate
          autoComplete="off"
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
        sx={{ my: 2 }}
      >
        <FormControlLabel
          label={t('signIn.rememberMe')}
          control={<Checkbox defaultChecked color="secondary" />}
          onChange={(event) => setRememberPassword(event.target.checked)}
        />

        <Link
          component={RouterLink}
          to="/reset-passwd"
          variant="subtitle2"
          color="secondary"
        >
          {t('signIn.forgot')}
        </Link>
      </Stack>

      <Stack spacing={2}>
        <LoadingButton
          variant="contained"
          size="large"
          sx={{
            width: '100%',
            '&.MuiButton-root:hover': {
              bgcolor: 'secondary.main',
              filter: 'brightness(90%)',
            },
            '&.MuiLoadingButton-loading': {
              bgcolor: 'primary.light',
              filter: 'brightness(120%)',
            },
          }}
          color="secondary"
          onClick={signInHandler}
          loading={loading}
        >
          {t('signIn.signin')}
        </LoadingButton>

        <Divider
          sx={{
            '&::before,&::after': { borderColor: 'primary.light' },
          }}
        >
          {t('signIn.or')}
        </Divider>

        <Button
          component={RouterLink}
          to="/signup"
          variant="contained"
          size="large"
          sx={{
            width: '100%',
            '&.MuiButton-root:hover': {
              bgcolor: 'secondary.main',
              filter: 'brightness(90%)',
            },
          }}
          color="secondary"
        >
          {t('signIn.signup')}
        </Button>
      </Stack>
    </>
  );
};

export default Login;
