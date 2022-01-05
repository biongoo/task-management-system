import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import {
  Box,
  Tab,
  Tabs,
  List,
  Stack,
  Avatar,
  ListItem,
  Checkbox,
  Collapse,
  ListItemText,
  ListItemAvatar,
  FormControlLabel,
} from '@mui/material';

import Select from '../UI/Inputs/Select';
import Dialog from '../UI/Modals/Dialog';
import TabPanel from '../UI/Tabs/TabPanel';
import useInput from '../../hooks/use-input';
import { setError } from '../../store/user-slice';
import DateTimeInput from '../UI/Inputs/DateTime';
import IconButton from '../UI/Buttons/IconButton';
import Attachment from '../UI/Buttons/Attachment';
import FilledAlert from '../UI/Alerts/FilledAlert';
import addEvent from '../../store/events/addEvent';
import Autocomplete from '../UI/Inputs/Autocomplete';
import { useAlert, wait } from '../../hooks/use-alert';
import Input100Width from '../UI/Inputs/Input100Width';
import { Add, Cancel } from '../UI/Buttons/FormButtons';
import { showSnackbar } from '../../store/palette-slice';

const AddEvent = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const { i18n, t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMarked, setIsMarked] = useState(true);
  const [typesLabel, setTypesLabel] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const {
    showAlert,
    alertType,
    alertMessage,
    alertTitle,
    setErrorAlert,
    closeAlert,
  } = useAlert();

  const subjects = useSelector((state) => state.subjects.subjects);
  const subjectsLabel = subjects.map((subject) => ({
    label: subject.name,
    id: subject.id,
  }));

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
    value: startDate,
    isValid: startDateIsValid,
    hasError: startDateHasError,
    valueChangeHandler: startDateChangeHandler,
    inputTouchHandler: startDateTouchHandler,
    reset: startDateReset,
  } = useInput((value) => value instanceof Date && !isNaN(value), {
    value: null,
  });

  const {
    value: endDate,
    isValid: endDateIsValid,
    hasError: endDateHasError,
    valueChangeHandler: endDateChangeHandler,
    inputTouchHandler: endDateTouchHandler,
    reset: endDateReset,
  } = useInput((value) => value instanceof Date && !isNaN(value), {
    value: null,
  });

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputTouchHandler: descriptionTouchHandler,
    reset: descriptionReset,
  } = useInput((value) => value.trim().length < 2048);

  const names = [
    t('global.notification1'),
    t('global.notification2'),
    t('global.notification3'),
    t('global.notification4'),
    t('global.notification5'),
    t('global.notification6'),
    t('global.notification7'),
    t('global.notification8'),
  ];

  let namesTmp = [];
  if (startDate instanceof Date && !isNaN(startDate)) {
    const dateNow = new Date();
    if (startDate - dateNow - 60 * 1000 > 0) namesTmp.push(names[0]);
    if (startDate - dateNow - 30 * 60 * 1000 > 0) namesTmp.push(names[1]);
    if (startDate - dateNow - 60 * 60 * 1000 > 0) namesTmp.push(names[2]);
    if (startDate - dateNow - 6 * 60 * 60 * 1000 > 0) namesTmp.push(names[3]);
    if (startDate - dateNow - 12 * 60 * 60 * 1000 > 0) namesTmp.push(names[4]);
    if (startDate - dateNow - 24 * 60 * 60 * 1000 > 0) namesTmp.push(names[5]);
    if (startDate - dateNow - 3 * 24 * 60 * 60 * 1000 > 0)
      namesTmp.push(names[6]);
    if (startDate - dateNow - 7 * 24 * 60 * 60 * 1000 > 0) {
      namesTmp.push(names[7]);
    }
  }

  const subjectFormIsValid =
    nameIsValid &&
    subjectNameIsValid &&
    subjectTypeIsValid &&
    startDateIsValid &&
    endDateIsValid &&
    descriptionIsValid;

  const otherFormIsValid =
    nameIsValid && startDateIsValid && endDateIsValid && descriptionIsValid;

  const handleAdd = async () => {
    let filesSize = 0;
    const formData = new FormData();

    nameTouchHandler();
    subjectNameTouchHandler();
    subjectTypeTouchHandler();
    startDateTouchHandler();
    endDateTouchHandler();
    descriptionTouchHandler();

    if (tab === 0) {
      if (!subjectFormIsValid) return;
    } else {
      if (!otherFormIsValid) return;
    }

    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    if ((endDate - startDate) / 1000 / 60 < 1) {
      setErrorAlert('global.error', t('global.incorrectDateOrDeadline'));
      return;
    }

    setLoading(true);

    formData.append('name', name);
    formData.append('description', description);
    formData.append('startDate', +startDate);
    formData.append('endDate', +endDate);
    formData.append('isMarked', isMarked);
    formData.append('tstId', subjectType ? subjectType.id : null);
    formData.append('language', i18n.language);

    for (const notification of notifications) {
      formData.append('notifications', notification);
    }

    for (const file of files) {
      formData.append('files', file, file.name);
      filesSize += file.size;
    }

    if (filesSize > 40000000) {
      setErrorAlert('global.error', t('global.sizeError'));
      setLoading(false);
      return;
    }

    const time1 = new Date().getTime();
    const resultAction = await dispatch(addEvent(formData));
    const time2 = new Date().getTime();

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    console.log(resultAction);

    /* if (addEvent.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'eventAdded':
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
      /* handleClose(); */
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

  const changeFilesHandler = (event) => {
    setFiles((prevValue) => {
      const dt = new DataTransfer();

      for (let i = 0; i < prevValue.length; i++) {
        dt.items.add(prevValue[i]);
      }

      for (let i = 0; i < event.target.files.length; i++) {
        if (
          Array.from(dt.files).findIndex(
            (e) =>
              e.name === event.target.files[i].name &&
              e.size === event.target.files[i].size &&
              e.lastModified === event.target.files[i].lastModified
          ) === -1
        )
          dt.items.add(event.target.files[i]);
      }

      return dt.files;
    });

    event.target.value = null;
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
      closeAlert();

      nameReset();
      subjectNameReset();
      subjectTypeReset();
      startDateReset();
      endDateReset();
      descriptionReset();
      setIsMarked(true);
      setFiles([]);
      setTypesLabel([]);
      setNotifications([0]);
      setTab(0);
    }, 300);
  };

  const handleChangeTab = (_, newValue) => {
    subjectNameReset();
    subjectTypeReset();
    setTypesLabel([]);
    setTab(newValue);
  };

  const body = (
    <>
      <Stack p={1} spacing={2}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          textColor="secondary"
          indicatorColor="secondary"
          centered
        >
          <Tab label={t('plan.subject')} />
          <Tab label={t('plan.other')} />
        </Tabs>
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
        <TabPanel value={tab} index={0}>
          <Stack spacing={2}>
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
          </Stack>
        </TabPanel>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ width: '100%' }}>
            <DateTimeInput
              id="startDate"
              label={t('dashboard.startDate')}
              value={startDate}
              maxDateTime={endDate}
              onChange={(e) => {
                startDateChangeHandler(e);
                if (e.target.value instanceof Date && !isNaN(e.target.value)) {
                  if (e.target.value - new Date() - 60 * 1000 > 0) {
                    setNotifications([0]);
                  } else {
                    setNotifications([]);
                  }
                } else {
                  setNotifications([]);
                }
              }}
              onBlur={startDateTouchHandler}
              error={startDateHasError}
              helperText={startDateHasError && t('global.incorrectEntry')}
              disabled={loading}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <DateTimeInput
              id="endDate"
              label={t('dashboard.endDate')}
              value={endDate}
              minDateTime={startDate}
              onChange={endDateChangeHandler}
              onBlur={endDateTouchHandler}
              error={endDateHasError}
              helperText={endDateHasError && t('global.incorrectEntry')}
              disabled={loading}
            />
          </Box>
        </Stack>
        <Input100Width
          id="description"
          label={t('global.description')}
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
        <Select
          id="notifications"
          list={namesTmp}
          label={t('global.notifications')}
          value={notifications}
          onChange={setNotifications}
        />
        <FormControlLabel
          label={t('global.isMarked')}
          control={<Checkbox checked={isMarked} color="secondary" />}
          onChange={(event) => setIsMarked(event.target.checked)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Attachment id="att" onChange={changeFilesHandler} />
        </Box>
        <Box>
          <List sx={{ py: 0 }}>
            <TransitionGroup>
              {Array.from(files).map((item, index) => (
                <Collapse key={item.name + item.size}>
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
        tooltip={t('dashboard.addEvent')}
        onClick={handleOpen}
        open={open}
        Icon={AddIcon}
      />
      <Dialog
        open={open}
        handleClose={handleClose}
        title={t('dashboard.addEvent')}
        body={body}
        buttons={buttons}
      />
    </>
  );
};

export default AddEvent;
