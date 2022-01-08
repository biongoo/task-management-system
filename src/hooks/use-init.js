import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../store/auth-slice';
import { showSnackbar } from '../store/palette-slice';
import { clearError } from '../store/user-slice';
import checkLoginAsync from '../store/auth/checkLogin';

import getPlan from '../store/plan/getPlan';
import getMarks from '../store/marks/getMarks';
import getEvents from '../store/events/getEvents';
import getTypes from '../store/subjects/getTypes';
import getTeachers from '../store/teachers/getTeachers';
import getHomework from '../store/homework/getHomework';
import getMaterials from '../store/materials/getMaterials';
import getSubjectsUser from '../store/subjects/user/getSubjectsUser';

const useInit = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const typeOfAccount = useSelector((state) => state.auth.type);

  const checkLogin = useCallback(async () => {
    const resultAction = await dispatch(checkLoginAsync());

    if (checkLoginAsync.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'userExists':
          dispatch(getPlan());
          dispatch(getHomework());
          dispatch(getEvents());
          dispatch(getTeachers());
          dispatch(getTypes());
          if (+typeOfAccount === 1) {
            dispatch(getSubjectsUser());
            dispatch(getMarks());
          }
          dispatch(getMaterials());
          break;
        case 'tokenNotValid':
        default:
          dispatch(logout());
          dispatch(
            showSnackbar({
              message: t('global.expiredSession'),
              variant: 'error',
            })
          );
          break;
      }
    } else {
      dispatch(logout());
      dispatch(
        showSnackbar({ message: t('global.connectionError'), variant: 'error' })
      );
    }
  }, [dispatch, t, typeOfAccount]);

  useEffect(() => {
    if (isLoggedIn) {
      checkLogin();
    }
  }, [isLoggedIn, checkLogin]);

  useEffect(() => {
    if (error) {
      dispatch(logout());
      dispatch(showSnackbar({ message: error, variant: 'error' }));
      dispatch(clearError());
    }
  }, [dispatch, error]);
};

export default useInit;
