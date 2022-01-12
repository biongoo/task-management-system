import { Stack } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import Dialog from '../UI/Modals/Dialog';
import useInput from '../../hooks/use-input';
import addMark from '../../store/marks/addMark';
import { setError } from '../../store/user-slice';
import DateTimeInput from '../UI/Inputs/DateTime';
import IconButton from '../UI/Buttons/IconButton';
import Autocomplete from '../UI/Inputs/Autocomplete';
import Input100Width from '../UI/Inputs/Input100Width';
import { Add, Cancel } from '../UI/Buttons/FormButtons';
import { showSnackbar } from '../../store/palette-slice';

const AddMark = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typesLabel, setTypesLabel] = useState([]);

  const subjects = useSelector((state) => state.subjects.subjects);
  const subjectsLabel = subjects.map((subject) => ({
    label: subject.name,
    id: subject.id,
  }));

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputTouchHandler: descriptionTouchHandler,
    reset: descriptionReset,
  } = useInput((value) => value.trim() && value.trim().length < 200);

  const {
    value: subjectName,
    isValid: subjectNameIsValid,
    hasError: subjectNameHasError,
    valueChangeHandler: subjectNameChangeHandler,
    inputTouchHandler: subjectNameTouchHandler,
    reset: subjectNameReset,
  } = useInput((value) => value, { value: null });

  const {
    value: subjectType,
    isValid: subjectTypeIsValid,
    hasError: subjectTypeHasError,
    valueChangeHandler: subjectTypeChangeHandler,
    inputTouchHandler: subjectTypeTouchHandler,
    reset: subjectTypeReset,
  } = useInput((value) => value, { value: null });

  const {
    value: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputTouchHandler: dateTouchHandler,
    reset: dateReset,
  } = useInput((value) => value instanceof Date && !isNaN(value), {
    value: new Date(),
  });

  const {
    value: mark,
    isValid: markIsValid,
    hasError: markHasError,
    valueChangeHandler: markChangeHandler,
    inputTouchHandler: markTouchHandler,
    reset: markReset,
  } = useInput(
    (value) => typeof +value === 'number' && +value <= 6 && +value >= 1
  );

  const formIsValid =
    subjectNameIsValid &&
    subjectTypeIsValid &&
    dateIsValid &&
    descriptionIsValid &&
    markIsValid;

  const handleAdd = async () => {
    subjectNameTouchHandler();
    subjectTypeTouchHandler();
    dateTouchHandler();
    descriptionTouchHandler();
    markTouchHandler();

    if (!formIsValid) return;

    setLoading(true);

    const time1 = new Date().getTime();
    const resultAction = await dispatch(
      addMark({ mark, date: +date, description, tstId: subjectType.id })
    );
    const time2 = new Date().getTime();

    if (addMark.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'markAdded':
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
      handleClose();
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 500 - (time2 - time1));
  };

  const changeSubjectHandler = (subject) => {
    subjectNameChangeHandler(subject);
    subjectTypeReset();

    if (subject.target.value) {
      const { teacherSubjectTypes } = subjects.find(
        (item) => item.id === subject.target.value.id
      );
      setTypesLabel(
        teacherSubjectTypes.map((tst) => ({
          label: `${tst.type.name} - ${tst.teacher.academicTitle} ${tst.teacher.firstName} ${tst.teacher.lastName}`,
          id: tst.id,
        }))
      );
    } else {
      setTypesLabel([]);
    }
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    if (loading) return;
    setOpen(false);

    setTimeout(() => {
      subjectNameReset();
      subjectTypeReset();
      dateReset();
      markReset();
      descriptionReset();
      setTypesLabel([]);
    }, 300);
  };

  const body = (
    <Stack my={2} spacing={2}>
      <Input100Width
        id="description"
        label={t('global.description')}
        value={description}
        onChange={descriptionChangeHandler}
        onBlur={descriptionTouchHandler}
        error={descriptionHasError}
        helperText={
          descriptionHasError &&
          t('global.incorrectEntryChar', { min: 1, max: 200 })
        }
        multiline
        maxRows={12}
        disabled={loading}
      />

      <Autocomplete
        id="subjectName"
        label={t('global.subject')}
        value={subjectName}
        onChange={changeSubjectHandler}
        onBlur={subjectNameTouchHandler}
        error={subjectNameHasError}
        helperText={subjectNameHasError && t('global.incorrectEntry')}
        disabled={loading}
        options={subjectsLabel}
      />

      <Autocomplete
        id="subjectType"
        label={t('global.type')}
        value={subjectType}
        onChange={subjectTypeChangeHandler}
        onBlur={subjectTypeTouchHandler}
        error={subjectTypeHasError}
        helperText={subjectTypeHasError && t('global.incorrectEntry')}
        disabled={loading}
        options={typesLabel}
      />

      <DateTimeInput
        id="date"
        label={t('global.date')}
        value={date}
        onChange={dateChangeHandler}
        onBlur={dateTouchHandler}
        error={dateHasError}
        helperText={dateHasError && t('global.incorrectEntry')}
        disabled={loading}
      />

      <Input100Width
        id="mark"
        type="number"
        label={t('global.mark')}
        value={mark}
        onKeyDown={(e) =>
          (e.key === 'e' || e.key === '+' || e.key === '-') &&
          e.preventDefault()
        }
        onChange={markChangeHandler}
        onBlur={markTouchHandler}
        error={markHasError}
        InputLabelProps={{
          shrink: true,
        }}
        helperText={
          markHasError && t('marks.incorrectMark', { min: 1, max: 6 })
        }
        disabled={loading}
      />
    </Stack>
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
      <Dialog
        open={open}
        handleClose={handleClose}
        title={t('marks.addMark')}
        body={body}
        buttons={buttons}
      />
    </>
  );
};

export default AddMark;
