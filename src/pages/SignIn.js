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
import signIn from '../store/auth/signIn.js';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import useInput from '../hooks/use-input.js';
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

    //const resultAction = await dispatch(signIn({ email, password }));
    await dispatch(signIn({ email, password }));
    
    setLoading(false);

    emailReset();
    passwordReset();
  };

  return (
    <>
      {rememberPassword} {/* //TODO */}
      <Stack spacing={1}>
        <Typography variant="h5">{t('signIn.title')}</Typography>
        <Typography variant="body2" color="primary.light">
          {t('signIn.enterDetails')}
        </Typography>
      </Stack>

      <Box pt={1}>
        <Input100Width
          id="email"
          label={t('signIn.email')}
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailTouchHandler}
          error={emailHasError}
          helperText={emailHasError && t('signIn.incorrectEntry')}
          disabled={loading}
        />

        <Input100Width
          id="password"
          label={t('signIn.password')}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordTouchHandler}
          error={passwordHasError}
          helperText={passwordHasError && t('signIn.incorrectEntry')}
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
        <LoadingButton100Width onClick={signInHandler} loading={loading}>
          {t('signIn.signIn')}
        </LoadingButton100Width>

        <Divider
          sx={{ '&::before,&::after': { borderColor: 'primary.light' } }}
        >
          {t('signIn.or')}
        </Divider>

        <LinkButton100Width to="/signup">
          {t('signIn.signUp')}
        </LinkButton100Width>
      </Stack>
    </>
  );
};

export default Login;
