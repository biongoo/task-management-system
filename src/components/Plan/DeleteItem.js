import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import MainModal from '../UI/Modals/MainModal';
import { setError } from '../../store/user-slice';
import deletePlan from '../../store/plan/deletePlan';
import { showSnackbar } from '../../store/palette-slice';
import { Cancel, Delete } from '../UI/Buttons/FormButtons';

const DeleteItem = ({ deleting, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const open = !!deleting;

  const handleDelete = async () => {
    setLoading(true);

    const time1 = new Date().getTime();
    const resultAction = await dispatch(deletePlan({ id: deleting.id }));
    const time2 = new Date().getTime();

    if (deletePlan.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'planElementDeleted':
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
      handleClose(null, deleting.id);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 500 - (time2 - time1));
  };

  const handleClose = (_, id) => {
    if (loading) return;

    if (id) {
      onClose(id);
    } else {
      onClose();
    }
  };

  const body = t('plan.deleteElementBody');

  const buttons = (
    <>
      <Cancel onClick={handleClose} disabled={loading} />
      <Delete onClick={handleDelete} loading={loading} />
    </>
  );

  return (
    <MainModal
      open={open}
      handleClose={handleClose}
      title={t('plan.deleteElement')}
      body={body}
      buttons={buttons}
    />
  );
};

export default DeleteItem;
