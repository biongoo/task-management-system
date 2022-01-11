import { Box, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useReducer, useEffect } from 'react';

import useInput from '../../../hooks/use-input';
import MainModal from '../../UI/Modals/MainModal';
import { setError } from '../../../store/user-slice';
import SubjectsTabs from '../../UI/Tabs/SubjectsTabs';
import FilledAlert from '../../UI/Alerts/FilledAlert';
import Autocomplete from '../../UI/Inputs/Autocomplete';
import { useAlert, wait } from '../../../hooks/use-alert';
import Input100Width from '../../UI/Inputs/Input100Width';
import { Edit, Cancel } from '../../UI/Buttons/FormButtons';
import { showSnackbar } from '../../../store/palette-slice';
import editSubjectTeacher from '../../../store/subjects/teacher/editSubjectTeacher';

const isDuplicate = (entry, arr) => {
  return arr.some((x) => entry.typeId === x.typeId);
};

const reducer = (state, action) => {
  let newState = [...state];

  switch (action.type) {
    case 'CHANGE_TYPE':
      newState[action.index].type = action.value;
      return newState;
    case 'CHANGE':
      newState[action.index].id = action.id;
      newState[action.index].type = action.type2;
      return newState;
    case 'RESET':
      return [
        { type: null },
        { type: null },
        { type: null },
        { type: null },
        { type: null },
      ];
    default:
      throw new Error();
  }
};

const EditTeacherSubject = ({ editing, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fieldsLabel, setFieldsLabel] = useState([]);
  const [facultiesLabel, setFacultiesLabel] = useState([]);

  const open = !!editing;

  const [state, dispatchState] = useReducer(reducer, [
    { type: null },
    { type: null },
    { type: null },
    { type: null },
    { type: null },
  ]);

  const types = useSelector((state) => state.subjects.types);
  const typesLabel = types.map((type) => ({ label: type.name, id: type.id }));

  const universities = useSelector((state) => state.universities.universities);
  const universitiesLabel = universities.map((university) => ({
    label: university.name,
    id: university.id,
  }));

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputTouchHandler: nameTouchHandler,
    reset: nameReset,
  } = useInput(
    (value) => value.trim().length >= 1 && value.trim().length < 200
  );

  const {
    value: university,
    isValid: universityIsValid,
    hasError: universityHasError,
    valueChangeHandler: universityChangeHandler,
    inputTouchHandler: universityTouchHandler,
    reset: universityReset,
  } = useInput((value) => value, { value: null });

  const {
    value: faculty,
    isValid: facultyIsValid,
    hasError: facultyHasError,
    valueChangeHandler: facultyChangeHandler,
    inputTouchHandler: facultyTouchHandler,
    reset: facultyReset,
  } = useInput((value) => value, { value: null });

  const {
    value: field,
    isValid: fieldIsValid,
    hasError: fieldHasError,
    valueChangeHandler: fieldChangeHandler,
    inputTouchHandler: fieldTouchHandler,
    reset: fieldReset,
  } = useInput((value) => value, { value: null });

  useEffect(() => {
    if (editing && editing.name.trim().length > 0) {
      const event = { target: { value: editing.name } };
      nameChangeHandler(event);

      const universityTmp = {
        target: {
          value: {
            label: editing.field.faculty.university.name,
            id: editing.field.faculty.university.id,
          },
        },
      };

      universityChangeHandler(universityTmp);

      const { faculties } = universities.find(
        (item) => item.id === editing.field.faculty.university.id
      );

      setFacultiesLabel(
        faculties.map((faculty) => ({
          label: faculty.name,
          id: faculty.id,
        }))
      );

      const facultyTmp = {
        target: {
          value: {
            label: editing.field.faculty.name,
            id: editing.field.faculty.id,
          },
        },
      };

      facultyChangeHandler(facultyTmp);

      const { fields } = universities
        .find((item) => item.id === editing.field.faculty.university.id)
        .faculties.find((item) => item.id === editing.field.faculty.id);

      setFieldsLabel(
        fields.map((field) => ({
          label: field.name,
          id: field.id,
        }))
      );

      const fieldNameTmp = {
        target: {
          value: {
            label: editing.field.name,
            id: editing.field.id,
          },
        },
      };

      fieldChangeHandler(fieldNameTmp);

      let primaryKey;
      for (const index in editing.teacherSubjectTypes) {
        primaryKey = editing.teacherSubjectTypes[index];
        dispatchState({
          type: 'CHANGE',
          index: index,
          id: primaryKey.id,
          type2: { label: primaryKey.type.name, id: primaryKey.type.id },
        });
      }
    }
  }, [
    editing,
    universities,
    nameChangeHandler,
    fieldChangeHandler,
    facultyChangeHandler,
    universityChangeHandler,
  ]);

  const {
    showAlert,
    alertType,
    alertMessage,
    alertTitle,
    setErrorAlert,
    closeAlert,
  } = useAlert();

  const formIsValid =
    nameIsValid && universityIsValid && facultyIsValid && fieldIsValid;

  const handleAdd = async () => {
    nameTouchHandler();
    universityTouchHandler();
    facultyTouchHandler();
    fieldTouchHandler();

    const types = [];

    if (!formIsValid) return;

    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    for (const index in state) {
      if (state[index].type !== null) {
        const entry = { typeId: state[index].type.id };

        if (!isDuplicate(entry, types)) {
          types.push(entry);
        } else {
          setErrorAlert(
            'global.error',
            t('subjects.groupErrorDuplicate', { number: +index + 1 })
          );
          return;
        }
      }
    }

    if (types.length === 0) {
      setErrorAlert('global.error', t('subjects.emptyGroups'));
      return;
    }

    setLoading(true);

    const time1 = new Date().getTime();
    const resultAction = await dispatch(
      editSubjectTeacher({ name, types, fieldId: field.id })
    );
    const time2 = new Date().getTime();

    if (editSubjectTeacher.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'subjectEdited':
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
    }, 500 - (time2 - time1));
  };

  const handleClose = () => {
    if (loading) return;
    onClose();

    setTimeout(() => {
      nameReset();
      closeAlert();
      dispatchState({ type: 'RESET' });
      universityReset();
      facultyReset();
      setFacultiesLabel([]);
      fieldReset();
      setFieldsLabel([]);
    }, 300);
  };

  const changeHandler = (index, event) => {
    dispatchState({
      type: 'CHANGE_TYPE',
      index: index,
      value: event.target.value,
    });
  };

  const changeUniversityHandler = (university) => {
    universityChangeHandler(university);
    facultyReset();
    fieldReset();
    setFieldsLabel([]);

    if (university.target.value) {
      const { faculties } = universities.find(
        (item) => item.id === university.target.value.id
      );
      setFacultiesLabel(
        faculties.map((faculty) => ({
          label: faculty.name,
          id: faculty.id,
        }))
      );
    } else {
      setFacultiesLabel([]);
    }
  };

  const changeFacultyHandler = (faculty) => {
    facultyChangeHandler(faculty);
    fieldReset();

    if (faculty.target.value) {
      const { fields } = universities
        .find((item) => item.id === university.id)
        .faculties.find((item) => item.id === faculty.target.value.id);

      setFieldsLabel(
        fields.map((field) => ({
          label: field.name,
          id: field.id,
        }))
      );
    } else {
      setFieldsLabel([]);
    }
  };

  const createItem = (index) => {
    return (
      <Autocomplete
        id="type"
        label={t('subjects.type')}
        value={state[index].type}
        onChange={changeHandler.bind(null, index)}
        disabled={loading}
        options={typesLabel}
      />
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
    <Box my={2}>
      <Stack spacing={2}>
        <Input100Width
          id="name"
          label={t('global.name')}
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameTouchHandler}
          error={nameHasError}
          helperText={
            nameHasError && t('global.incorrectEntryChar', { min: 1, max: 200 })
          }
          disabled={loading}
        />
        <Autocomplete
          id="university"
          label={t('fields.university')}
          value={university}
          onChange={changeUniversityHandler}
          onBlur={universityTouchHandler}
          error={universityHasError}
          helperText={universityHasError && t('global.incorrectEntry')}
          disabled={loading}
          options={universitiesLabel}
        />
        <Autocomplete
          id="faculty"
          label={t('fields.faculty')}
          value={faculty}
          onChange={changeFacultyHandler}
          onBlur={facultyTouchHandler}
          error={facultyHasError}
          helperText={facultyHasError && t('global.incorrectEntry')}
          disabled={loading}
          options={facultiesLabel}
        />
        <Autocomplete
          id="field"
          label={t('subjects.field')}
          value={field}
          onChange={fieldChangeHandler}
          onBlur={fieldTouchHandler}
          error={fieldHasError}
          helperText={fieldHasError && t('global.incorrectEntry')}
          disabled={loading}
          options={fieldsLabel}
        />
      </Stack>
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
      <Edit onClick={handleAdd} loading={loading} />
    </>
  );

  return (
    <MainModal
      open={open}
      handleClose={handleClose}
      title={t('subjects.editSubject')}
      body={body}
      buttons={buttons}
    />
  );
};

export default EditTeacherSubject;
