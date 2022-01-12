import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Dialog from '../UI/Modals/Dialog';
import { setError } from '../../store/user-slice';
import { showSnackbar } from '../../store/palette-slice';
import deleteEvent from '../../store/events/deleteEvent';
import { Cancel, Delete } from '../UI/Buttons/FormButtons';

const DeleteEvent = ({ deleting, onBack, onExit }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const open = !!deleting;

  const handleDelete = async () => {
    setLoading(true);

    const time1 = new Date().getTime();
    const resultAction = await dispatch(deleteEvent({ id: deleting.id }));
    const time2 = new Date().getTime();

    if (deleteEvent.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'eventDeleted':
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
      onExit();
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 200 - (time2 - time1));
  };

  const handleClose = () => {
    if (loading) return;

    onBack();
  };

  const body = t('dashboard.deleteEventBody');

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
      title={t('dashboard.deleteEvent')}
      body={body}
      buttons={buttons}
    />
  );
};

export default DeleteEvent;
