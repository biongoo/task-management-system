import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

import MainModal from '../../UI/Modals/MainModal';
import { setError } from '../../../store/user-slice';
import { showSnackbar } from '../../../store/palette-slice';
import deleteType from '../../../store/subjects/deleteType';
import getSubjects from '../../../store/subjects/getSubjects';
import { Cancel, Delete as DeleteBtn } from '../../UI/Buttons/FormButtons';

const Delete = ({ type, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const open = !!type;

  useEffect(() => {
    if (type && type.name.trim().length > 0) {
      setName(type.name);
    }
  }, [type]);

  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  const handleDelete = async () => {
    setLoading(true);

    const time1 = new Date().getTime();

    const resultAction = await dispatch(deleteType({ id: type.id }));

    const time2 = new Date().getTime();

    if (deleteType.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'typeDeleted':
          setTimeout(() => {
            dispatch(
              showSnackbar({
                message: t('global.success'),
                time: 2000,
              })
            );
          }, 500);
          dispatch(getSubjects());
          break;
        case 'tokenNotValid':
        case 'typeNotExists':
        default:
          dispatch(setError(t('global.expiredSession')));
          break;
      }
    } else {
      dispatch(setError(t('global.expiredSession')));
    }

    setTimeout(() => {
      handleClose();
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 500 - (time2 - time1));
  };

  const body = t('subjects.deleteTypeBody', { type: name });

  const buttons = (
    <>
      <Cancel onClick={handleClose} disabled={loading} />
      <DeleteBtn onClick={handleDelete} loading={loading} />
    </>
  );

  return (
    <MainModal
      open={open}
      handleClose={handleClose}
      title={t('subjects.deleteType')}
      body={body}
      buttons={buttons}
    />
  );
};

export default Delete;
