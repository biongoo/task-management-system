import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Stack } from '@mui/material';

import Dialog from '../UI/Modals/Dialog';
import useInput from '../../hooks/use-input';
import { setError } from '../../store/user-slice';
import IconButton from '../UI/Buttons/IconButton';
import FilledAlert from '../UI/Alerts/FilledAlert';
import addField from '../../store/fields/addField';
import Autocomplete from '../UI/Inputs/Autocomplete';
import { useAlert, wait } from '../../hooks/use-alert';
import Input100Width from '../UI/Inputs/Input100Width';
import { Add, Cancel } from '../UI/Buttons/FormButtons';
import { showSnackbar } from '../../store/palette-slice';

const AddField = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typesLabel, setTypesLabel] = useState([]);

  const {
    showAlert,
    alertType,
    alertMessage,
    alertTitle,
    setErrorAlert,
    closeAlert,
  } = useAlert();

  const universities = useSelector((state) => state.universities.universities);
  const subjectsLabel = universities.map((university) => ({
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
    (value) => value.trim().length > 1 && value.trim().length <= 200
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

  const formIsValid = nameIsValid && universityIsValid && facultyIsValid;

  const handleAdd = async () => {
    nameTouchHandler();
    universityTouchHandler();
    facultyTouchHandler();

    if (!formIsValid) return;

    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    setLoading(true);

    const time1 = new Date().getTime();
    const resultAction = await dispatch(
      addField({ facultyId: faculty.id, name })
    );
    const time2 = new Date().getTime();

    if (addField.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'fieldAdded':
          setTimeout(() => {
            dispatch(
              showSnackbar({
                message: t('global.success'),
                time: 2000,
              })
            );
          }, 500);
          break;
        case 'fieldAlreadyExists':
          setErrorAlert('global.error', t('global.nameInUse'));
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
      handleClose();
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 500 - (time2 - time1));
  };

  const changeUniversityHandler = (university) => {
    universityChangeHandler(university);
    facultyReset();

    if (university.target.value) {
      const { faculties } = universities.find(
        (item) => item.id === university.target.value.id
      );
      setTypesLabel(
        faculties.map((faculty) => ({
          label: faculty.name,
          id: faculty.id,
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
      closeAlert();

      nameReset();
      universityReset();
      facultyReset();
      setTypesLabel([]);
    }, 300);
  };

  const body = (
    <>
      <Stack p={1} spacing={2}>
        <Input100Width
          id="name"
          label={t('global.name')}
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameTouchHandler}
          error={nameHasError}
          helperText={
            nameHasError && t('global.incorrectEntryChar', { min: 1, max: 100 })
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
          options={subjectsLabel}
        />
        <Autocomplete
          id="faculty"
          label={t('fields.faculty')}
          value={faculty}
          onChange={facultyChangeHandler}
          onBlur={facultyTouchHandler}
          error={facultyHasError}
          helperText={facultyHasError && t('global.incorrectEntry')}
          disabled={loading}
          options={typesLabel}
        />
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
        title={t('fields.addField')}
        body={body}
        buttons={buttons}
      />
    </>
  );
};

export default AddField;
