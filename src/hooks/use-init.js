import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { clearError } from '../store/user-slice';
import { showSnackbar } from '../store/palette-slice';
import checkLoginAsync from '../store/auth/checkLogin';
import { logout, startLogout, stopLogout } from '../store/auth-slice';

import getPlan from '../store/plan/getPlan';
import getMarks from '../store/marks/getMarks';
import getEvents from '../store/events/getEvents';
import getTypes from '../store/subjects/getTypes';
import getFields from '../store/fields/getFields';
import getSubjects from '../store/subjects/getSubjects';
import getTeachers from '../store/teachers/getTeachers';
import getHomework from '../store/homework/getHomework';
import getMaterials from '../store/materials/getMaterials';
import getUniversities from '../store/universities/getUniversities';

import { resetPlan } from '../store/plan-slice';
import { resetMarks } from '../store/marks-slice';
import { resetEvents } from '../store/events-slice';
import { resetFields } from '../store/fields-slice';
import { resetHomework } from '../store/homework-slice';
import { resetSubjects } from '../store/subjects-slice';
import { resetTeachers } from '../store/teachers-slice';
import { resetMaterials } from '../store/materials-slice';
import { resetUniversities } from '../store/universities-slice';

const useInit = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.user);
  const { isLoggedIn, logsOut } = useSelector((state) => state.auth);
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
          dispatch(getMaterials());
          dispatch(getSubjects());
          if (+typeOfAccount === 1) {
            dispatch(getMarks());
          } else if (+typeOfAccount === 2) {
            dispatch(getUniversities());
            dispatch(getFields());
          }
          break;
        case 'tokenNotValid':
        default:
          dispatch(startLogout());
          dispatch(
            showSnackbar({
              message: t('global.expiredSession'),
              variant: 'error',
            })
          );
          break;
      }
    } else {
      dispatch(startLogout());
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
      dispatch(startLogout());
      dispatch(showSnackbar({ message: error, variant: 'error' }));
      dispatch(clearError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (logsOut) {
      dispatch(stopLogout());
      dispatch(logout());

      dispatch(resetPlan());
      dispatch(resetMarks());
      dispatch(resetEvents());
      dispatch(resetFields());
      dispatch(resetHomework());
      dispatch(resetSubjects());
      dispatch(resetTeachers());
      dispatch(resetMaterials());
      dispatch(resetUniversities());
    }
  }, [dispatch, logsOut]);
};

export default useInit;
