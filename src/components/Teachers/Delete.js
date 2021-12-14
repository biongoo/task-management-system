import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import MainModal from '../UI/Modals/MainModal';
import { setError } from '../../store/user-slice';
import { showSnackbar } from '../../store/palette-slice';
import deleteTeacher from '../../store/teachers/deleteTeacher';
import { Cancel, Delete as DeleteBtn } from '../UI/Buttons/FormButtons';

const Delete = ({ deleting, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const open = !!deleting;

  useEffect(() => {
    if (deleting && deleting.firstName.trim().length > 0) {
      setName(
        `${deleting.academicTitle} ${deleting.firstName} ${deleting.lastName}`
      );
    }
  }, [deleting]);

  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  const handleDelete = async () => {
    setLoading(true);

    const time1 = new Date().getTime();

    const resultAction = await dispatch(
      deleteTeacher({ id: deleting.id })
    );

    const time2 = new Date().getTime();

    setTimeout(() => {
      handleClose();
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 500 - (time2 - time1));

    if (deleteTeacher.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'teacherDeleted':
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
        case 'teacherNotExists':
        default:
          dispatch(setError(t('global.expiredSession')));
          break;
      }
    } else {
      dispatch(setError(t('global.expiredSession')));
    }
  };

  const body = t('teachers.deleteBody', {
    teacher: name,
  });

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
      title={t('teachers.deleteTeacher')}
      body={body}
      buttons={buttons}
    />
  );
};

export default Delete;
