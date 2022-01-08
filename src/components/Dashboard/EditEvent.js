import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import {
  Box,
  Tab,
  Link,
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

import DeleteEvent from './DeleteEvent';
import Select from '../UI/Inputs/Select';
import Dialog from '../UI/Modals/Dialog';
import TabPanel from '../UI/Tabs/TabPanel';
import useInput from '../../hooks/use-input';
import { setError } from '../../store/user-slice';
import DateTimeInput from '../UI/Inputs/DateTime';
import IconButton from '../UI/Buttons/IconButton';
import Attachment from '../UI/Buttons/Attachment';
import FilledAlert from '../UI/Alerts/FilledAlert';
import editEvent from '../../store/events/editEvent';
import Autocomplete from '../UI/Inputs/Autocomplete';
import { useAlert, wait } from '../../hooks/use-alert';
import Input100Width from '../UI/Inputs/Input100Width';
import { showSnackbar } from '../../store/palette-slice';
import { Edit, Delete, Cancel } from '../UI/Buttons/FormButtons';

const EditEvent = ({ editing, onClose }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const { i18n, t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [oldFiles, setOldFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
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

  useEffect(() => {
    if (editing && !deleting) {
      if (editing.teacherSubjectType) {
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
              label: `${editing.teacherSubjectType.type.name} - ${editing.teacherSubjectType.teacher.academicTitle} ${editing.teacherSubjectType.teacher.firstName} ${editing.teacherSubjectType.teacher.lastName}`,
              id: editing.teacherSubjectType.id,
            },
          },
        };

        subjectTypeChangeHandler(subjectTypeTmp);
        subjectNameChangeHandler(subjectNameTmp);
        setTypesLabel(
          teacherSubjectTypes.map((tst) => ({
            label: `${tst.type.name} - ${tst.teacher.academicTitle} ${tst.teacher.firstName} ${tst.teacher.lastName}`,
            id: tst.id,
          }))
        );
      } else {
        setTab(1);
      }

      const nameTmp = { target: { value: editing.name } };

      const startDateTmp = {
        target: {
          value: new Date(editing.startDate),
        },
      };

      const endDateTmp = {
        target: {
          value: new Date(editing.endDate),
        },
      };

      const descriptionTmp = {
        target: {
          value: editing.description,
        },
      };

      const now = new Date();
      let notificationsTmp = [];
      for (const item of editing.notifications) {
        const alertDate = new Date(item.alertDate);

        if (alertDate > now) {
          const numberOfSecToDeadline =
            (startDateTmp.target.value - alertDate) / 1000;
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
      startDateChangeHandler(startDateTmp);
      endDateChangeHandler(endDateTmp);
      descriptionChangeHandler(descriptionTmp);
      setNotifications(notificationsTmp);
      setIsMarked(editing.isMarked);
      setOldFiles(editing.files);
      setOpen(true);
    }
  }, [
    editing,
    subjects,
    deleting,
    setTypesLabel,
    nameChangeHandler,
    endDateChangeHandler,
    startDateChangeHandler,
    subjectNameChangeHandler,
    subjectTypeChangeHandler,
    descriptionChangeHandler,
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

  const handleEdit = async () => {
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

    formData.append('id', editing.id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('startDate', +startDate);
    formData.append('endDate', +endDate);
    formData.append('isMarked', tab === 0 ? isMarked : false);
    formData.append('tstId', tab === 0 ? subjectType.id : 0);
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
    const resultAction = await dispatch(editEvent(formData));
    const time2 = new Date().getTime();

    if (editEvent.fulfilled.match(resultAction)) {
      switch (resultAction.payload.message) {
        case 'eventEdited':
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

    setOpen(false);
    onClose();

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

  const handleOpenDelete = () => {
    setOpen(false);
    setTimeout(() => {
      setDeleting(editing);
    }, 300);
  };

  const handleCloseDelete = () => {
    setDeleting(null);
    setTimeout(() => {
      setOpen(true);
    }, 300);
  };

  const handleExitDelete = () => {
    setDeleting(null);
    handleClose();
  };

  const handleChangeTab = (_, newValue) => {
    if (editing.teacherSubjectType) {
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
            label: `${editing.teacherSubjectType.type.name} - ${editing.teacherSubjectType.teacher.academicTitle} ${editing.teacherSubjectType.teacher.firstName} ${editing.teacherSubjectType.teacher.lastName}`,
            id: editing.teacherSubjectType.id,
          },
        },
      };

      subjectTypeChangeHandler(subjectTypeTmp);
      subjectNameChangeHandler(subjectNameTmp);
      setTypesLabel(
        teacherSubjectTypes.map((tst) => ({
          label: `${tst.type.name} - ${tst.teacher.academicTitle} ${tst.teacher.firstName} ${tst.teacher.lastName}`,
          id: tst.id,
        }))
      );
    }

    setIsMarked(true);
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
        <TabPanel value={tab} index={0}>
          <FormControlLabel
            label={t('global.isMarked')}
            control={<Checkbox checked={isMarked} color="secondary" />}
            onChange={(event) => setIsMarked(event.target.checked)}
          />
        </TabPanel>
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
                      <ListItemText
                        primary={
                          <Link
                            href={`http://java.ts4ever.pl/files/download/${item.id}`}
                            color="inherit"
                          >
                            {item.name}
                          </Link>
                        }
                      />
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
      <Delete onClick={handleOpenDelete} disabled={loading} />
      <Edit onClick={handleEdit} loading={loading} />
    </>
  );

  return (
    <>
      <DeleteEvent
        deleting={deleting}
        onBack={handleCloseDelete}
        onExit={handleExitDelete}
      />
      <Dialog
        open={open}
        handleClose={handleClose}
        title={t('dashboard.editEvent')}
        body={body}
        buttons={buttons}
      />
    </>
  );
};

export default EditEvent;
