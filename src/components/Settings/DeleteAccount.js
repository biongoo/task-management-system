import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { red } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Dialog from '../UI/Modals/Dialog';
import { logout } from '../../store/auth-slice';
import { setError } from '../../store/user-slice';
import IconButton from '../UI/Buttons/IconButton';
import { showSnackbar } from '../../store/palette-slice';
import { Cancel, Delete } from '../UI/Buttons/FormButtons';
import deleteAccount from '../../store/auth/deleteAccount';

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const time1 = new Date().getTime();
    const resultAction = await dispatch(deleteAccount());
    const time2 = new Date().getTime();

    if (deleteAccount.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'userDeleted':
          setTimeout(() => {
            dispatch(logout());
            dispatch(
              showSnackbar({
                message: t('settings.successDelete'),
                time: 2000,
              })
            );
          }, 500);
          break;
        default:
          dispatch(setError(t('global.expiredSession')));
          break;
      }
    } else {
      dispatch(setError(t('global.expiredSession')));
    }

    setTimeout(() => {
      setShowDelete(false);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 200 - (time2 - time1));
  };

  const handleClose = () => {
    if (loading) return;

    setShowDelete(false);
  };

  const body = t('settings.deleteBody');

  const buttons = (
    <>
      <Cancel onClick={handleClose} disabled={loading} />
      <Delete onClick={handleDelete} loading={loading} />
    </>
  );

  return (
    <>
      <IconButton
        tooltip={t('settings.delete')}
        onClick={() => setShowDelete((prevState) => !prevState)}
        Icon={DeleteForeverIcon}
        color={red[800]}
        open={showDelete}
        defaultSize={32}
      />
      <Dialog
        open={showDelete}
        handleClose={handleClose}
        title={t('settings.delete')}
        body={body}
        buttons={buttons}
      />
    </>
  );
};

export default DeleteAccount;
