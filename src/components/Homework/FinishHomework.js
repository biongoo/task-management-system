import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

import Dialog from '../UI/Modals/Dialog';
import { setError } from '../../store/user-slice';
import { showSnackbar } from '../../store/palette-slice';
import finishHomework from '../../store/homework/finishHomework';
import { Cancel, CustomizeButton } from '../UI/Buttons/FormButtons';

const FinishHomework = ({ finishing, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [item, setItem] = useState({ id: 0, name: '', isDone: false });
  const [loading, setLoading] = useState(false);

  const open = !!finishing;

  useEffect(() => {
    if (finishing) {
      setItem(finishing);
    }
  }, [finishing]);

  const handleFinish = async () => {
    setLoading(true);

    const time1 = new Date().getTime();
    const resultAction = await dispatch(
      finishHomework({ id: item.id, isDone: !item.isDone })
    );
    const time2 = new Date().getTime();

    if (finishHomework.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'homeworkFinishedOrRestored':
          setTimeout(() => {
            dispatch(
              showSnackbar({
                message: t('global.success'),
                time: 2000,
              })
            );
          }, 500);
          break;
        case 'outOfCurrentTasksLimit':
          setTimeout(() => {
            dispatch(
              showSnackbar({
                message: t('homework.outOfCurrentTasksLimit'),
                time: 6000,
                variant: 'error',
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

  const body = !item.isDone
    ? t('homework.finishBody', { name: item.name })
    : t('homework.restoreBody', { name: item.name });

  const buttons = (
    <>
      <Cancel onClick={handleClose} disabled={loading} />
      <CustomizeButton
        onClick={handleFinish}
        loading={loading}
        color="success"
        text={!item.isDone ? t('homework.finish') : t('homework.restore')}
      />
    </>
  );

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={!item.isDone ? t('homework.finish') : t('homework.restore')}
      body={body}
      buttons={buttons}
    />
  );
};

export default FinishHomework;
