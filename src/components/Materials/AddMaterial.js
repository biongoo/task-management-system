import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import {
  Box,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Collapse,
} from '@mui/material';

import Dialog from '../UI/Modals/Dialog';
import DateInput from '../UI/Inputs/Date';
import useInput from '../../hooks/use-input';
/* import { setError } from '../../store/user-slice'; */
import IconButton from '../UI/Buttons/IconButton';
import Attachment from '../UI/Buttons/Attachment';
import FilledAlert from '../UI/Alerts/FilledAlert';
import Autocomplete from '../UI/Inputs/Autocomplete';
import { useAlert, wait } from '../../hooks/use-alert';
import Input100Width from '../UI/Inputs/Input100Width';
import { Add, Cancel } from '../UI/Buttons/FormButtons';
/* import { showSnackbar } from '../../store/palette-slice'; */
import addMaterial from '../../store/materials/addMaterial';

const AddMaterial = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
    /* setErrorAlert, */
    closeAlert,
  } = useAlert();

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputTouchHandler: nameTouchHandler,
    reset: nameReset,
  } = useInput((value) => value.trim());

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
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputTouchHandler: descriptionTouchHandler,
    reset: descriptionReset,
  } = useInput((value) => value.trim().length < 2048);

  const formIsValid =
    nameIsValid &&
    subjectNameIsValid &&
    subjectTypeIsValid &&
    dateIsValid &&
    descriptionIsValid;

  const handleAdd = async () => {
    nameTouchHandler();
    subjectNameTouchHandler();
    subjectTypeTouchHandler();
    dateTouchHandler();
    descriptionTouchHandler();

    if (!formIsValid) return;

    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    setLoading(true);

    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('day', date.getDate());
    formData.append('month', date.getMonth() + 1);
    formData.append('year', date.getFullYear());
    formData.append('tstId', subjectType.id);

    for (const file of files) {
      formData.append('files', file, file.name);
    }

    const time1 = new Date().getTime();
    const resultAction = await dispatch(addMaterial(formData));
    const time2 = new Date().getTime();

    if (addMaterial.fulfilled.match(resultAction)) {
      console.log(resultAction.payload);
    }

    /* if (addPlan.fulfilled.match(resultAction)) {
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
    } */

    setTimeout(() => {
      handleClose();
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

  const changeFilesHandler = (event) => {
    setFiles(event.target.files);
  };

  const deleteFileHandler = (key) => {
    const dt = new DataTransfer();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (key !== i) dt.items.add(file);
    }

    setFiles(dt.files);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    if (loading) return;

    setOpen(false);

    setTimeout(() => {
      nameReset();
      subjectNameReset();
      subjectTypeReset();
      dateReset();
      descriptionReset();
      setFiles([]);
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
        <DateInput
          id="date"
          label={t('materials.date')}
          value={date}
          onChange={dateChangeHandler}
          onBlur={dateTouchHandler}
          error={dateHasError}
          helperText={dateHasError && t('global.incorrectEntry')}
          disabled={loading}
        />
        <Input100Width
          id="description"
          label={t('materials.description')}
          value={description}
          onChange={descriptionChangeHandler}
          onBlur={descriptionTouchHandler}
          error={descriptionHasError}
          helperText={
            descriptionHasError &&
            t('global.incorrectEntryChar', { min: 0, max: 2048 })
          }
          multiline
          maxRows={12}
          disabled={loading}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Attachment id="att" onChange={changeFilesHandler} />
        </Box>
        <Box>
          <List sx={{ py: 0 }}>
            <TransitionGroup>
              {Array.from(files).map((item, index) => (
                <Collapse key={item.name}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        tooltip={t('global.delete')}
                        edge="end"
                        Icon={DeleteIcon}
                        defaultSize={26}
                        onClick={deleteFileHandler.bind(null, +index)}
                      />
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.dark' }}>
                        <FilePresentIcon sx={{ color: 'primary.light' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        </Box>
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
        title={t('plan.addElement')}
        body={body}
        buttons={buttons}
      />
    </>
  );
};

export default AddMaterial;
