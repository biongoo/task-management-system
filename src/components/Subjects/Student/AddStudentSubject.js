import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import React, { useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../../hooks/use-input';
import MainModal from '../../UI/Modals/MainModal';
import { setError } from '../../../store/user-slice';
import IconButton from '../../UI/Buttons/IconButton';
import SubjectsTabs from '../../UI/Tabs/SubjectsTabs';
import FilledAlert from '../../UI/Alerts/FilledAlert';
import Autocomplete from '../../UI/Inputs/Autocomplete';
import { useAlert, wait } from '../../../hooks/use-alert';
import Input100Width from '../../UI/Inputs/Input100Width';
import { Add, Cancel } from '../../UI/Buttons/FormButtons';
import { showSnackbar } from '../../../store/palette-slice';
import addSubjectUser from '../../../store/subjects/student/addSubjectStudent';

const isDuplicate = (entry, arr) => {
  return arr.some(
    (x) => entry.typeId === x.typeId && entry.teacherId === x.teacherId
  );
};

const reducer = (state, action) => {
  let newState = [...state];

  switch (action.type) {
    case 'CHANGE_TEACHER':
      newState[action.index].teacher = action.value;
      return newState;
    case 'CHANGE_TYPE':
      newState[action.index].type = action.value;
      return newState;
    case 'RESET':
      return [
        { type: null, teacher: null },
        { type: null, teacher: null },
        { type: null, teacher: null },
        { type: null, teacher: null },
        { type: null, teacher: null },
      ];
    default:
      throw new Error();
  }
};

const AddStudentSubject = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state, dispatchState] = useReducer(reducer, [
    { type: null, teacher: null },
    { type: null, teacher: null },
    { type: null, teacher: null },
    { type: null, teacher: null },
    { type: null, teacher: null },
  ]);

  const types = useSelector((state) => state.subjects.types);
  const teachers = useSelector((state) => state.teachers.teachers);

  const typesLabel = types.map((type) => ({ label: type.name, id: type.id }));
  const teachersLabel = teachers.map((teacher) => ({
    label: `${teacher.academicTitle} ${teacher.firstName} ${teacher.lastName}`,
    id: teacher.id,
  }));

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputTouchHandler: nameTouchHandler,
    reset: nameReset,
  } = useInput(
    (value) => value.trim().length >= 2 && value.trim().length < 100
  );

  const {
    showAlert,
    alertType,
    alertMessage,
    alertTitle,
    setErrorAlert,
    closeAlert,
  } = useAlert();

  const handleAdd = async () => {
    nameTouchHandler();

    const teacherType = [];
    const teacherTypeOriginal = [];

    if (!nameIsValid) return;
    for (const index in state) {
      if (
        (state[index].type !== null && state[index].teacher === null) ||
        (state[index].type === null && state[index].teacher !== null)
      ) {
        setErrorAlert(
          'global.error',
          t('subjects.groupError', { number: +index + 1 })
        );
        return;
      }
      if (state[index].type !== null && state[index].teacher !== null) {
        const entry = {
          typeId: state[index].type.id,
          teacherId: state[index].teacher.id,
        };

        if (!isDuplicate(entry, teacherType)) {
          teacherType.push(entry);
          teacherTypeOriginal.push({
            teacher: teachers.find(
              (teacher) => teacher.id === state[index].teacher.id
            ),
            type: types.find((type) => type.id === state[index].type.id),
          });
        } else {
          setErrorAlert(
            'global.error',
            t('subjects.groupErrorDuplicate', { number: +index + 1 })
          );
          return;
        }
      }
    }

    setLoading(true);
    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    const time1 = new Date().getTime();
    const resultAction = await dispatch(
      addSubjectUser({ name, teacherType, teacherTypeOriginal })
    );
    const time2 = new Date().getTime();

    if (addSubjectUser.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'subjectAdded':
          setTimeout(() => {
            dispatch(
              showSnackbar({
                message: t('global.success'),
                time: 2000,
              })
            );
          }, 500);
          break;
        case 'subjectExists':
          setErrorAlert('global.error', t('subjects.subjectExists'));
          setLoading(false);
          return;
        case 'tokenNotValid':
        case 'typeNotExists':
        case 'teacherNotExists':
        case 'nameNotValid':
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

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    if (loading) return;
    setOpen(false);

    setTimeout(() => {
      nameReset();
      closeAlert();
      dispatchState({ type: 'RESET' });
    }, 300);
  };

  const changeHandler = (index, type, event) => {
    const value = event.target.value;

    if (type === 0)
      dispatchState({ type: 'CHANGE_TEACHER', index: index, value: value });
    if (type === 1)
      dispatchState({ type: 'CHANGE_TYPE', index: index, value: value });
  };

  const createItem = (index) => {
    return (
      <>
        <Autocomplete
          id="teacher"
          label={t('subjects.teacher')}
          value={state[index].teacher}
          onChange={changeHandler.bind(null, index, 0)}
          disabled={loading}
          options={teachersLabel}
        />
        <Autocomplete
          id="type"
          label={t('subjects.type')}
          value={state[index].type}
          onChange={changeHandler.bind(null, index, 1)}
          disabled={loading}
          options={typesLabel}
        />
      </>
    );
  };

  const items = [
    createItem(0),
    createItem(1),
    createItem(2),
    createItem(3),
    createItem(4),
  ];

  const body = (
    <Box mt={3} mb={2}>
      <Input100Width
        id="name"
        label={t('global.name')}
        value={name}
        onChange={nameChangeHandler}
        onBlur={nameTouchHandler}
        error={nameHasError}
        helperText={
          nameHasError && t('global.incorrectEntryChar', { min: 2, max: 100 })
        }
        disabled={loading}
      />
      <SubjectsTabs items={items} name={t('subjects.group')} />
      <Box mt={1}>
        <FilledAlert
          show={showAlert}
          severity={alertType}
          title={t(alertTitle)}
          message={alertMessage}
          onCloseAlert={closeAlert}
        />
      </Box>
    </Box>
  );

  const buttons = (
    <>
      <Cancel onClick={handleClose} disabled={loading} />
      <Add onClick={handleAdd} loading={loading} />
    </>
  );

  return (
    <>
      <IconButton
        tooltip={t('global.add')}
        onClick={handleOpen}
        open={open}
        Icon={AddIcon}
      />

      <MainModal
        open={open}
        handleClose={handleClose}
        title={t('subjects.addSubject')}
        body={body}
        buttons={buttons}
      />
    </>
  );
};

export default AddStudentSubject;
