import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

import MainModal from '../UI/Modals/MainModal';
import { setError } from '../../store/user-slice';
import { showSnackbar } from '../../store/palette-slice';
import deleteSubject from '../../store/subjects/deleteSubject';
import { Cancel, Delete as DeleteBtn } from '../UI/Buttons/FormButtons';

const DeleteSubject = ({ deleting, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const open = !!deleting;

  useEffect(() => {
    if (deleting && deleting.name.trim().length > 0) {
      setName(deleting.name);
    }
  }, [deleting]);

  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  const handleDelete = async () => {
    setLoading(true);

    const time1 = new Date().getTime();
    const resultAction = await dispatch(deleteSubject({ id: deleting.id }));
    const time2 = new Date().getTime();

    if (deleteSubject.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'subjectDeleted':
          setTimeout(() => {
            dispatch(
              showSnackbar({
                message: t('global.success'),
                time: 2000,
              })
            );
          }, 500);
          break;
        case 'tokenNotValid':
        case 'subjectNotExists':
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

  const body = t('subjects.deleteSubjectBody', { subject: name });

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
      title={t('subjects.deleteSubject')}
      body={body}
      buttons={buttons}
    />
  );
};

export default DeleteSubject;
