import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Stack } from '@mui/material';

import Dialog from '../UI/Modals/Dialog';
import useInput from '../../hooks/use-input';
import editMark from '../../store/marks/editMark';
import { setError } from '../../store/user-slice';
import DateTimeInput from '../UI/Inputs/DateTime';
import Input100Width from '../UI/Inputs/Input100Width';
import { Edit, Cancel } from '../UI/Buttons/FormButtons';
import { showSnackbar } from '../../store/palette-slice';

let flag = false;

const EditMark = ({ editing, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const open = !!editing;

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputTouchHandler: descriptionTouchHandler,
    reset: descriptionReset,
  } = useInput((value) =>
    flag ? true : value.trim() && value.trim().length < 200
  );

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

  useEffect(() => {
    if (editing) {
      if (editing.date) {
        dateChangeHandler({ target: { value: new Date(editing.date) } });
      }

      if (editing.description) {
        descriptionChangeHandler({ target: { value: editing.description } });
      }

      if (editing.mark) {
        markChangeHandler({ target: { value: editing.mark } });
      }

      flag = editing.homework || editing.event ? true : false;
    }
  }, [editing, dateChangeHandler, markChangeHandler, descriptionChangeHandler]);

  const formIsValid = dateIsValid && descriptionIsValid && markIsValid;

  const handleEdit = async () => {
    dateTouchHandler();
    descriptionTouchHandler();
    markTouchHandler();

    if (!formIsValid) return;

    setLoading(true);

    const time1 = new Date().getTime();
    const resultAction = await dispatch(
      editMark({ id: editing.id, mark, date: +date, description })
    );
    const time2 = new Date().getTime();

    if (editMark.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'markEdited':
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

  const handleClose = () => {
    if (loading) return;

    onClose();

    setTimeout(() => {
      descriptionReset();
      dateReset();
      markReset();
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
      <Edit onClick={handleEdit} loading={loading} />
    </>
  );

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={t('marks.editMark')}
      body={body}
      buttons={buttons}
    />
  );
};

export default EditMark;
