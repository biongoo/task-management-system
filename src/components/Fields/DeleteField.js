import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Dialog from '../UI/Modals/Dialog';
import { setError } from '../../store/user-slice';
import deleteField from '../../store/fields/deleteField';
import { showSnackbar } from '../../store/palette-slice';
import { Cancel, Delete } from '../UI/Buttons/FormButtons';

const DeleteField = ({ deleting, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const open = !!deleting;

  const handleDelete = async () => {
    setLoading(true);

    const time1 = new Date().getTime();
    const resultAction = await dispatch(deleteField({ id: deleting.id }));
    const time2 = new Date().getTime();

    if (deleteField.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'fieldDeleted':
          setTimeout(() => {
            dispatch(
              showSnackbar({
                message: t('global.success'),
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
      onClose();
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 200 - (time2 - time1));
  };

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  const body = t('fields.deleteFieldBody');

  const buttons = (
    <>
      <Cancel onClick={handleClose} disabled={loading} />
      <Delete onClick={handleDelete} loading={loading} />
    </>
  );

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={t('fields.deleteField')}
      body={body}
      buttons={buttons}
    />
  );
};

export default DeleteField;
