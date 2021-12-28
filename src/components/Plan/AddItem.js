import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

import Time from '../UI/Inputs/Time';
import Dialog from '../UI/Modals/Dialog';
import useInput from '../../hooks/use-input';
import addPlan from '../../store/plan/addPlan';
import { setError } from '../../store/user-slice';
import FilledAlert from '../UI/Alerts/FilledAlert';
import Autocomplete from '../UI/Inputs/Autocomplete';
import { useAlert, wait } from '../../hooks/use-alert';
import { Add, Cancel } from '../UI/Buttons/FormButtons';
import { showSnackbar } from '../../store/palette-slice';

const AddItem = ({ open, onClose, number }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState('0');
  const [typesLabel, setTypesLabel] = useState([]);

  const subjects = useSelector((state) => state.subjects.subjects);
  const subjectsLabel = subjects.map((subject) => ({
    label: subject.name,
    id: subject.id,
  }));

  const {
    showAlert,
    alertType,
    alertMessage,
    alertTitle,
    setErrorAlert,
    closeAlert,
  } = useAlert();

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
    value: startTime,
    isValid: startTimeIsValid,
    hasError: startTimeHasError,
    valueChangeHandler: startTimeChangeHandler,
    inputTouchHandler: startTimeTouchHandler,
    reset: startTimeReset,
  } = useInput((value) => value instanceof Date && !isNaN(value), {
    value: null,
  });

  const {
    value: endTime,
    isValid: endTimeIsValid,
    hasError: endTimeHasError,
    valueChangeHandler: endTimeChangeHandler,
    inputTouchHandler: endTimeTouchHandler,
    reset: endTimeReset,
  } = useInput((value) => value instanceof Date && !isNaN(value), {
    value: null,
  });

  const formIsValid =
    subjectNameIsValid &&
    subjectTypeIsValid &&
    startTimeIsValid &&
    endTimeIsValid;

  const handleAdd = async () => {
    subjectNameTouchHandler();
    subjectTypeTouchHandler();
    startTimeTouchHandler();
    endTimeTouchHandler();

    if (!formIsValid) return;

    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    if (
      (new Date(
        null,
        null,
        null,
        endTime.getHours(),
        endTime.getMinutes(),
        null
      ) -
        new Date(
          null,
          null,
          null,
          startTime.getHours(),
          startTime.getMinutes(),
          null
        )) /
        1000 /
        60 <
      1
    ) {
      setErrorAlert('global.error', t('plan.timeError'));
      return;
    }

    setLoading(true);

    const day = number - 1;
    const start = startTime.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    });
    const end = endTime.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    });

    const time1 = new Date().getTime();
    const resultAction = await dispatch(
      addPlan({
        day,
        startTime: start,
        endTime: end,
        tstId: subjectType.id,
        repetition: +frequency,
      })
    );
    const time2 = new Date().getTime();

    if (addPlan.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'planElementAdded':
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
      handleClose(null, {
        id: resultAction.payload.id,
        day,
        startTime: start,
        endTime: end,
        repetition: +frequency,
        teacherSubjectType: resultAction.payload.teacherSubjectType,
      });

      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 500 - (time2 - time1));
  };

  const changeSubjectHandler = (subject) => {
    subjectNameChangeHandler(subject);

    const { teacherSubjectTypes } = subjects.find(
      (item) => item.id === subject.target.value.id
    );

    subjectTypeReset();
    setTypesLabel(
      teacherSubjectTypes.map((tst) => ({
        label: `${tst.type.name} - ${tst.teacher.academicTitle} ${tst.teacher.firstName} ${tst.teacher.lastName}`,
        id: tst.id,
      }))
    );
  };

  const handleClose = (_, item) => {
    if (loading) return;

    if (item) {
      onClose(item);
    } else {
      onClose();
    }

    setTimeout(() => {
      subjectNameReset();
      subjectTypeReset();
      startTimeReset();
      endTimeReset();
      setFrequency('0');
    }, 300);
  };

  const body = (
    <>
      <Stack p={1} spacing={2}>
        <Autocomplete
          id="subjectName"
          label={t('plan.subject')}
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
          label={t('plan.type')}
          value={subjectType}
          onChange={subjectTypeChangeHandler}
          onBlur={subjectTypeTouchHandler}
          error={subjectTypeHasError}
          helperText={subjectTypeHasError && t('global.incorrectEntry')}
          disabled={loading}
          options={typesLabel}
        />
        <Time
          id="startTime"
          label={t('plan.timeStart')}
          value={startTime}
          onChange={startTimeChangeHandler}
          onBlur={startTimeTouchHandler}
          error={startTimeHasError}
          helperText={startTimeHasError && t('global.incorrectEntry')}
          disabled={loading}
        />
        <Time
          id="endTime"
          label={t('plan.timeEnd')}
          value={endTime}
          onChange={endTimeChangeHandler}
          onBlur={endTimeTouchHandler}
          error={endTimeHasError}
          helperText={endTimeHasError && t('global.incorrectEntry')}
          disabled={loading}
        />
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{ '&.Mui-focused': { color: 'secondary.main' } }}
          >
            {t('plan.frequency')}
          </FormLabel>
          <RadioGroup
            row
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <FormControlLabel
              value="0"
              control={<Radio color="secondary" />}
              label={t('plan.week0')}
            />
            <FormControlLabel
              value="1"
              control={<Radio color="secondary" />}
              label={t('plan.week1')}
            />
            <FormControlLabel
              value="2"
              control={<Radio color="secondary" />}
              label={t('plan.week2')}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Box mt={1}>
        <FilledAlert
          show={showAlert}
          severity={alertType}
          title={t(alertTitle)}
          message={alertMessage}
          onCloseAlert={closeAlert}
        />
      </Box>
    </>
  );

  const buttons = (
    <>
      <Cancel onClick={handleClose} disabled={loading} />
      <Add onClick={handleAdd} loading={loading} />
    </>
  );

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={t('plan.addElement')}
      body={body}
      buttons={buttons}
    />
  );
};

export default AddItem;
