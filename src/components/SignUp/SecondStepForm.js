import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Stack,
  InputAdornment,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

import { wait } from '../../hooks/use-alert.js';
import useInput from '../../hooks/use-input.js';
import Input100Width from '../UI/Inputs/Input100Width';
import signUpThird from '../../store/auth/signUpThird.js';
import LoadingButton100Width from '../UI/Buttons/LoadingButton100Width.js';

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
  const [type, setType] = useState('1');

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputTouchHandler: passwordTouchHandler,
    reset: passwordReset,
  } = useInput((value) => value.trim().length >= 6);

  const signUpHandler = async (event) => {
    event.preventDefault();
    passwordTouchHandler();
    if (!passwordIsValid) return;

    setLoading(true);
    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    const resultAction = await dispatch(
      signUpThird({ email, token, password, type: +type })
    );

    setLoading(false);
    passwordReset();

    if (signUpThird.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'userAdded':
          navigate('/signup/thirdstep');
          break;
        case 'registrationUserNotExists':
        case 'invalidPassword':
        case 'invalidType':
        case 'userExists':
          setErrorAlert(
            'signUp.errorTitle',
            `signUp.${resultAction.payload.message}`
          );
          break;
        default:
          setErrorAlert('signUp.errorTitle', 'signUp.connectionError');
          break;
      }
    } else {
      setErrorAlert('signUp.errorTitle', 'signUp.connectionError');
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Stack spacing={2} pt={1} mb={2}>
        <Input100Width
          id="email"
          label={t('signUp.email')}
          value={email}
          onChange={() => {}}
          onBlur={() => {}}
          disabled={true}
        />

        <Input100Width
          id="password"
          label={t('signIn.password')}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordTouchHandler}
          error={passwordHasError}
          helperText={passwordHasError && t('signIn.weakPassword')}
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

        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{ '&.Mui-focused': { color: 'secondary.main' } }}
          >
            {t('signUp.type')}
          </FormLabel>
          <RadioGroup
            row
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <FormControlLabel
              value="1"
              control={<Radio color="secondary" />}
              label={t('signUp.student')}
            />
            <FormControlLabel
              value="2"
              control={<Radio color="secondary" />}
              label={t('signUp.teacher')}
            />
          </RadioGroup>
        </FormControl>

        <LoadingButton100Width onClick={signUpHandler} loading={loading}>
          {t('signUp.signUp')}
        </LoadingButton100Width>
      </Stack>
    </Box>
  );
};

export default SecondStepForm;
