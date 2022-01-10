import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Radio,
  Stack,
  FormLabel,
  RadioGroup,
  FormControl,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import Header from '../Header';
import { wait } from '../../../hooks/use-alert.js';
import useInput from '../../../hooks/use-input.js';
import IconButton from '../../UI/Buttons/IconButton';
import Input100Width from '../../UI/Inputs/Input100Width';
import registerThird from '../../../store/auth/registerThird.js';
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
  const [type, setType] = useState('1');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputTouchHandler: passwordTouchHandler,
    reset: passwordReset,
  } = useInput((value) => value.trim().length >= 6);

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputTouchHandler: confirmPasswordTouchHandler,
    reset: confirmPasswordReset,
  } = useInput((value) => value === password);

  const formIsValid = passwordIsValid && confirmPasswordIsValid;

  const signUpHandler = async (event) => {
    event.preventDefault();
    passwordTouchHandler();
    confirmPasswordTouchHandler();

    if (!formIsValid) return;

    setLoading(true);
    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    const resultAction = await dispatch(
      registerThird({ email, token, password, type: +type })
    );

    setLoading(false);

    if (registerThird.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'userAdded':
          navigate('/signup/thirdstep');
          break;
        case 'registrationUserNotExists':
          setErrorAlert('global.error', 'register.registrationUserNotExists');
          break;
        case 'invalidPassword':
          setErrorAlert('global.error', 'global.invalidPassword');
          break;
        case 'invalidType':
          setErrorAlert('global.error', 'register.invalidType');
          break;
        case 'userExists':
          setErrorAlert('global.error', 'register.userExists');
          break;
        default:
          setErrorAlert('global.error', 'global.connectionError');
          break;
      }
    } else {
      setErrorAlert('global.error', 'global.connectionError');
    }

    passwordReset();
    confirmPasswordReset();
  };

  return (
    <Stack spacing={2} mb={2}>
      <Header header={'auth.title2'} subHeader={'auth.enterDetails'} />

      <Input100Width
        id="email"
        label={t('global.email')}
        value={email}
        onChange={() => {}}
        onBlur={() => {}}
        disabled={true}
      />

      <Input100Width
        id="password"
        label={t('global.password')}
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={passwordChangeHandler}
        onBlur={passwordTouchHandler}
        error={passwordHasError}
        helperText={passwordHasError && t('global.invalidPassword6')}
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                tooltip={
                  showPassword
                    ? t('global.hidePassword')
                    : t('global.showPassword')
                }
                onClick={() => setShowPassword((prevState) => !prevState)}
                Icon={showPassword ? VisibilityOff : Visibility}
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

      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          sx={{ '&.Mui-focused': { color: 'secondary.main' } }}
        >
          {t('register.type')}
        </FormLabel>
        <RadioGroup row value={type} onChange={(e) => setType(e.target.value)}>
          <FormControlLabel
            value="1"
            control={<Radio color="secondary" />}
            label={t('register.student')}
          />
          <FormControlLabel
            value="2"
            control={<Radio color="secondary" />}
            label={t('register.teacher')}
          />
        </RadioGroup>
      </FormControl>

      <LoadingButton100Width onClick={signUpHandler} loading={loading}>
        {t('auth.signUp')}
      </LoadingButton100Width>
    </Stack>
  );
};

export default SecondStepForm;
