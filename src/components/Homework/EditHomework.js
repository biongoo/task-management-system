import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import {
  Box,
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
import useInput from '../../hooks/use-input';
import { setError } from '../../store/user-slice';
import DateTimeInput from '../UI/Inputs/DateTime';
import IconButton from '../UI/Buttons/IconButton';
import Attachment from '../UI/Buttons/Attachment';
import FilledAlert from '../UI/Alerts/FilledAlert';
import Autocomplete from '../UI/Inputs/Autocomplete';
import { useAlert, wait } from '../../hooks/use-alert';
import Input100Width from '../UI/Inputs/Input100Width';
import { Edit, Cancel } from '../UI/Buttons/FormButtons';
import { showSnackbar } from '../../store/palette-slice';
import editHomework from '../../store/homework/editHomework';

const EditHomework = ({ editing, onClose }) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [oldFiles, setOldFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMarked, setIsMarked] = useState(true);
  const [typesLabel, setTypesLabel] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const typeOfAccount = useSelector((state) => state.auth.type);

  const open = !!editing;

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
    value: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputTouchHandler: dateTouchHandler,
    reset: dateReset,
  } = useInput((value) => value instanceof Date && !isNaN(value), {
    value: null,
  });

  const {
    value: deadline,
    isValid: deadlineIsValid,
    hasError: deadlineHasError,
    valueChangeHandler: deadlineChangeHandler,
    inputTouchHandler: deadlineTouchHandler,
    reset: deadlineReset,
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

  const {
    value: estimatedHours,
    isValid: estimatedHoursIsValid,
    hasError: estimatedHoursHasError,
    valueChangeHandler: estimatedHoursChangeHandler,
    inputTouchHandler: estimatedHoursTouchHandler,
    reset: estimatedHoursReset,
  } = useInput(
    (value) => typeof +value === 'number' && +value <= 500 && +value >= 0
  );

  const {
    value: estimatedMinutes,
    isValid: estimatedMinutesIsValid,
    hasError: estimatedMinutesHasError,
    valueChangeHandler: estimatedMinutesChangeHandler,
    inputTouchHandler: estimatedMinutesTouchHandler,
    reset: estimatedMinutesReset,
  } = useInput(
    (value) => typeof +value === 'number' && +value <= 59 && +value >= 0
  );

  useEffect(() => {
    if (editing) {
      const nameTmp = { target: { value: editing.name } };

      const subjectNameTmp = {
        target: {
          value: {
            label: editing.teacherSubjectType.subject.name,
            id: editing.teacherSubjectType.subject.id,
          },
        },
      };

      const { teacherSubjectTypes } = subjects.find(
        (item) => item.id === editing.teacherSubjectType.subject.id
      );

      const subjectTypeTmp = {
        target: {
          value: {
            label: editing.teacherSubjectType.teacher
              ? `${editing.teacherSubjectType.type.name} - ${editing.teacherSubjectType.teacher.academicTitle} ${editing.teacherSubjectType.teacher.firstName} ${editing.teacherSubjectType.teacher.lastName}`
              : editing.teacherSubjectType.type.name,
            id: editing.teacherSubjectType.id,
          },
        },
      };

      const dateTmp = {
        target: {
          value: new Date(editing.date),
        },
      };

      const deadlineTmp = {
        target: {
          value: new Date(editing.deadline),
        },
      };

      const descriptionTmp = {
        target: {
          value: editing.description,
        },
      };

      const estimatedHoursTmp = {
        target: { value: Math.floor(editing.estimatedTime / 60) },
      };
      const estimatedMinutesTmp = {
        target: { value: editing.estimatedTime % 60 },
      };

      const now = new Date();
      let notificationsTmp = [];
      for (const item of editing.notifications) {
        const alertDate = new Date(item.alertDate);

        if (alertDate > now) {
          const numberOfSecToDeadline =
            (deadlineTmp.target.value - alertDate) / 1000;
          switch (numberOfSecToDeadline) {
            case 0:
              notificationsTmp.push(0);
              break;
            case 30 * 60:
              notificationsTmp.push(1);
              break;
            case 60 * 60:
              notificationsTmp.push(2);
              break;
            case 6 * 60 * 60:
              notificationsTmp.push(3);
              break;
            case 12 * 60 * 60:
              notificationsTmp.push(4);
              break;
            case 24 * 60 * 60:
              notificationsTmp.push(5);
              break;
            case 3 * 24 * 60 * 60:
              notificationsTmp.push(6);
              break;
            case 7 * 24 * 60 * 60:
              notificationsTmp.push(7);
              break;
            default:
              break;
          }
        }
      }

      nameChangeHandler(nameTmp);
      subjectNameChangeHandler(subjectNameTmp);
      setTypesLabel(
        teacherSubjectTypes.map((tst) => ({
          label: tst.teacher
            ? `${tst.type.name} - ${tst.teacher.academicTitle} ${tst.teacher.firstName} ${tst.teacher.lastName}`
            : tst.type.name,
          id: tst.id,
        }))
      );
      subjectTypeChangeHandler(subjectTypeTmp);
      dateChangeHandler(dateTmp);
      deadlineChangeHandler(deadlineTmp);
      descriptionChangeHandler(descriptionTmp);
      estimatedHoursChangeHandler(estimatedHoursTmp);
      estimatedMinutesChangeHandler(estimatedMinutesTmp);
      setNotifications(notificationsTmp);
      setIsMarked(editing.isMarked);
      setOldFiles(editing.files);
    }
  }, [
    editing,
    subjects,
    setTypesLabel,
    nameChangeHandler,
    dateChangeHandler,
    deadlineChangeHandler,
    subjectNameChangeHandler,
    subjectTypeChangeHandler,
    descriptionChangeHandler,
    estimatedHoursChangeHandler,
    estimatedMinutesChangeHandler,
  ]);

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
  if (deadline instanceof Date && !isNaN(deadline)) {
    const dateNow = new Date();
    if (deadline - dateNow - 60 * 1000 > 0) namesTmp.push(names[0]);
    if (deadline - dateNow - 30 * 60 * 1000 > 0) namesTmp.push(names[1]);
    if (deadline - dateNow - 60 * 60 * 1000 > 0) namesTmp.push(names[2]);
    if (deadline - dateNow - 6 * 60 * 60 * 1000 > 0) namesTmp.push(names[3]);
    if (deadline - dateNow - 12 * 60 * 60 * 1000 > 0) namesTmp.push(names[4]);
    if (deadline - dateNow - 24 * 60 * 60 * 1000 > 0) namesTmp.push(names[5]);
    if (deadline - dateNow - 3 * 24 * 60 * 60 * 1000 > 0)
      namesTmp.push(names[6]);
    if (deadline - dateNow - 7 * 24 * 60 * 60 * 1000 > 0) {
      namesTmp.push(names[7]);
    }
  }

  const formIsValid =
    nameIsValid &&
    subjectNameIsValid &&
    subjectTypeIsValid &&
    dateIsValid &&
    deadlineIsValid &&
    descriptionIsValid &&
    estimatedHoursIsValid &&
    estimatedMinutesIsValid;

  const handleEdit = async () => {
    let filesSize = 0;
    const formData = new FormData();

    nameTouchHandler();
    subjectNameTouchHandler();
    subjectTypeTouchHandler();
    dateTouchHandler();
    deadlineTouchHandler();
    descriptionTouchHandler();
    estimatedHoursTouchHandler();
    estimatedMinutesTouchHandler();

    if (!formIsValid) return;

    if (showAlert) {
      closeAlert();
      await wait(250);
    }

    if ((deadline - date) / 1000 / 60 < 1) {
      setErrorAlert('global.error', t('global.incorrectDateOrDeadline'));
      return;
    }

    setLoading(true);

    const estimatedTime = estimatedHours * 60 + estimatedMinutes;

    formData.append('id', editing.id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('date', +date);
    formData.append('deadline', +deadline);
    formData.append('estimatedTime', estimatedTime);
    formData.append('isMarked', typeOfAccount === 1 ? isMarked : false);
    formData.append('tstId', subjectType.id);
    formData.append('language', i18n.language);

    for (const notification of notifications) {
      formData.append('notifications', notification);
    }

    for (const file of files) {
      formData.append('files', file, file.name);
      filesSize += file.size;
    }

    for (const oldFile of oldFiles) {
      formData.append('oldFiles', oldFile.id);
      filesSize += oldFile.size;
    }

    if (filesSize > 40000000) {
      setErrorAlert('global.error', t('global.sizeError'));
      setLoading(false);
      return;
    }

    const time1 = new Date().getTime();
    const resultAction = await dispatch(editHomework(formData));
    const time2 = new Date().getTime();

    if (editHomework.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'homeworkEdited':
          setTimeout(() => {
            dispatch(
              showSnackbar({
                message: t('global.success'),
                time: 2000,
              })
            );
          }, 500);
          break;
        case 'outOfFilesLimit':
          setErrorAlert('global.error', t('global.outOfFilesLimit'));
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

  const changeSubjectHandler = (subject) => {
    subjectNameChangeHandler(subject);
    subjectTypeReset();

    if (subject.target.value) {
      const { teacherSubjectTypes } = subjects.find(
        (item) => item.id === subject.target.value.id
      );
      setTypesLabel(
        teacherSubjectTypes.map((tst) => ({
          label: tst.teacher
            ? `${tst.type.name} - ${tst.teacher.academicTitle} ${tst.teacher.firstName} ${tst.teacher.lastName}`
            : tst.type.name,
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

  const deleteOldFileHandler = (id) => {
    setOldFiles((prevState) => prevState.filter((item) => item.id !== id));
  };

  const handleClose = () => {
    if (loading) return;
    onClose();

    setTimeout(() => {
      closeAlert();

      nameReset();
      subjectNameReset();
      subjectTypeReset();
      dateReset();
      deadlineReset();
      descriptionReset();
      estimatedHoursReset();
      estimatedMinutesReset();
      setIsMarked(true);
      setFiles([]);
      setTypesLabel([]);
      setNotifications([0]);
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
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ width: '100%' }}>
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
          </Box>
          <Box sx={{ width: '100%' }}>
            <DateTimeInput
              id="deadline"
              label={t('global.deadline')}
              value={deadline}
              onChange={(e) => {
                deadlineChangeHandler(e);
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
              onBlur={deadlineTouchHandler}
              error={deadlineHasError}
              helperText={deadlineHasError && t('global.incorrectEntry')}
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

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ width: '100%' }}>
            <Input100Width
              id="estimatedHours"
              type="number"
              label={t('homework.estimatedHours')}
              value={estimatedHours}
              onKeyDown={(e) =>
                (e.key === 'e' || e.key === '+' || e.key === '-') &&
                e.preventDefault()
              }
              onChange={estimatedHoursChangeHandler}
              onBlur={(e) => {
                estimatedHoursTouchHandler(e);
                const event = {
                  target: {
                    value:
                      e.target.value === '' ? '' : Math.floor(e.target.value),
                  },
                };
                estimatedHoursChangeHandler(event);
              }}
              error={estimatedHoursHasError}
              InputLabelProps={{
                shrink: true,
              }}
              helperText={
                estimatedHoursHasError &&
                t('homework.incorrectNumber', { min: 0, max: 500 })
              }
              disabled={loading}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Input100Width
              id="estimatedMinutes"
              type="number"
              label={t('homework.estimatedMinutes')}
              value={estimatedMinutes}
              onKeyDown={(e) =>
                (e.key === 'e' || e.key === '+' || e.key === '-') &&
                e.preventDefault()
              }
              onChange={estimatedMinutesChangeHandler}
              onBlur={(e) => {
                estimatedMinutesTouchHandler(e);
                const event = {
                  target: {
                    value:
                      e.target.value === '' ? '' : Math.floor(e.target.value),
                  },
                };
                estimatedMinutesChangeHandler(event);
              }}
              error={estimatedMinutesHasError}
              InputLabelProps={{
                shrink: true,
              }}
              helperText={
                estimatedMinutesHasError &&
                t('homework.incorrectNumber', { min: 0, max: 59 })
              }
              disabled={loading}
            />
          </Box>
        </Stack>
        <Select
          id="notifications"
          list={namesTmp}
          label={t('global.notifications')}
          value={notifications}
          onChange={setNotifications}
        />
        {typeOfAccount === 1 && (
          <FormControlLabel
            label={t('global.isMarked')}
            control={<Checkbox checked={isMarked} color="secondary" />}
            onChange={(event) => setIsMarked(event.target.checked)}
          />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Attachment id="att" onChange={changeFilesHandler} />
        </Box>
        <Box>
          <List sx={{ py: 0 }}>
            <TransitionGroup>
              {Array.from(files)
                .concat(oldFiles)
                .map((item, index) => (
                  <Collapse key={item.name + item.size}>
                    <ListItem
                      secondaryAction={
                        <IconButton
                          tooltip={t('global.delete')}
                          edge="end"
                          Icon={DeleteIcon}
                          defaultSize={26}
                          onClick={
                            index < Object.keys(files).length
                              ? deleteFileHandler.bind(null, +index)
                              : deleteOldFileHandler.bind(null, item.id)
                          }
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
      <Edit onClick={handleEdit} loading={loading} />
    </>
  );

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={t('homework.editHomework')}
      body={body}
      buttons={buttons}
    />
  );
};

export default EditHomework;
