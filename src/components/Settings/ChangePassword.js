import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Stack, Typography, InputAdornment } from '@mui/material';

import useInput from '../../hooks/use-input';
import { logout } from '../../store/auth-slice';
import { Edit } from '../UI/Buttons/FormButtons';
import { setError } from '../../store/user-slice';
import IconButton from '../UI/Buttons/IconButton';
import Input100Width from '../UI/Inputs/Input100Width';
import { showSnackbar } from '../../store/palette-slice';
import changePassword from '../../store/auth/changePassword';

const ChangePassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    value: oldPassword,
    isValid: oldPasswordIsValid,
    hasError: oldPasswordHasError,
    valueChangeHandler: oldPasswordChangeHandler,
    inputTouchHandler: oldPasswordTouchHandler,
    reset: oldPasswordReset,
  } = useInput((value) => value.trim() !== '');

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

  const formIsValid =
    oldPasswordIsValid && newPasswordIsValid && confirmPasswordIsValid;

  const handleEdit = async () => {
    oldPasswordTouchHandler();
    newPasswordTouchHandler();
    confirmPasswordTouchHandler();

    if (!formIsValid) return;
    setLoading(true);

    const time1 = new Date().getTime();
    const resultAction = await dispatch(
      changePassword({ oldPassword, newPassword })
    );
    const time2 = new Date().getTime();

    setTimeout(() => {
      if (changePassword.fulfilled.match(resultAction)) {
        switch (resultAction.payload.message) {
          case 'passwordEdited':
            dispatch(logout());
            dispatch(
              showSnackbar({
                message: t('settings.successChange'),
                time: 4000,
              })
            );
            break;
          case 'invalidOldPassword':
            dispatch(
              showSnackbar({
                message: t('settings.invalidOldPassword'),
                variant: 'error',
                time: 2000,
              })
            );
            break;
          default:
            dispatch(setError(t('global.expiredSession')));
            break;
        }
      } else {
        dispatch(setError(t('global.expiredSession')));
      }

      setLoading(false);
      oldPasswordReset();
      newPasswordReset();
      confirmPasswordReset();
    }, 500 - (time2 - time1));
  };

  return (
    <>
      <Typography variant="h6" mb={2}>
        {t('settings.changePassword')}:
      </Typography>

      <Stack spacing={2}>
        <Input100Width
          id="oldPassword"
          label={t('settings.oldPassword')}
          type={showOldPassword ? 'text' : 'password'}
          value={oldPassword}
          onChange={oldPasswordChangeHandler}
          onBlur={oldPasswordTouchHandler}
          error={oldPasswordHasError}
          helperText={oldPasswordHasError && t('global.invalidPassword')}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  tooltip={
                    showOldPassword
                      ? t('global.hidePassword')
                      : t('global.showPassword')
                  }
                  onClick={() => setShowOldPassword((prevState) => !prevState)}
                  Icon={showOldPassword ? VisibilityOff : Visibility}
                />
              </InputAdornment>
            ),
          }}
        />
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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Edit onClick={handleEdit} loading={loading} />
        </Box>
      </Stack>
    </>
  );
};

export default ChangePassword;
