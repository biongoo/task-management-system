import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Tab,
  Tabs,
  Paper,
  Stack,
  Backdrop,
  Typography,
  CircularProgress,
} from '@mui/material';

import Sort from '../components/UI/Sorts/Sort';
import Search from '../components/UI/Inputs/Search';
import getHomework from '../store/homework/getHomework';
import Divider from '../components/UI/Dividers/Divider';
import AddHomework from '../components/Homework/AddHomework';
import HomeworkList from '../components/Homework/HomeworkList';

const Homework = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedSortingIndex, setSelectedSortingIndex] = useState(0);
  const { homework, loading, firstLoading } = useSelector(
    (state) => state.homework
  );

  useEffect(() => {
    dispatch(getHomework());
  }, [dispatch]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  let homeworkCopy = [...homework];

  homeworkCopy = homeworkCopy.filter((homework) => homework.isDone === !!tab);

  let homeworkToCalculateTime = [...homework].filter(
    (homework) => homework.isDone === false
  );
  homeworkToCalculateTime = homeworkToCalculateTime.sort((a, b) =>
    a.deadline.localeCompare(b.deadline)
  );

  if (search) {
    homeworkCopy = homeworkCopy.filter((homework) =>
      `${homework.deadline.split('T')[0]} - ${
        homework.teacherSubjectType.subject.name
      }`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  switch (selectedSortingIndex) {
    case 0:
      homeworkCopy = homeworkCopy.sort((a, b) =>
        `${a.deadline.split('T')[0]} - ${
          a.teacherSubjectType.subject.name
        }`.localeCompare(
          `${b.deadline.split('T')[0]} - ${b.teacherSubjectType.subject.name}`
        )
      );
      break;
    case 1:
      homeworkCopy = homeworkCopy.sort((b, a) =>
        `${a.deadline.split('T')[0]} - ${
          a.teacherSubjectType.subject.name
        }`.localeCompare(
          `${b.deadline.split('T')[0]} - ${b.teacherSubjectType.subject.name}`
        )
      );
      break;
    case 2:
      break;
    case 3:
      homeworkCopy = homeworkCopy.reverse();
      break;
    default:
      break;
  }

  const handleChangeTab = (_, newValue) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading && firstLoading && !homeworkCopy.length}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Paper
        sx={{
          width: { xs: '95%', md: '95%' },
          maxWidth: '1100px',
          padding: { xs: 2, md: 2.5 },
          bgcolor: 'primary.main',
          boxShadow: 4,
          borderRadius: 4,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
          mx={1}
          spacing={2}
        >
          <Search search={search} searchHandler={searchHandler} />
          <Stack direction="row">
            <Sort
              selectedIndex={selectedSortingIndex}
              setSelectedIndex={setSelectedSortingIndex}
            />
            <AddHomework />
          </Stack>
        </Stack>

        <Tabs
          value={tab}
          onChange={handleChangeTab}
          textColor="secondary"
          indicatorColor="secondary"
          centered
        >
          <Tab label={t('homework.current')} />
          <Tab label={t('homework.done')} />
        </Tabs>
        <Divider mb={3} />

        <HomeworkList
          homework={homeworkCopy}
          search={search}
          tab={tab}
          homeworkToCalculateTime={homeworkToCalculateTime}
        />

        {!homeworkCopy.length && search && (
          <Box sx={{ textAlign: 'center' }}>
            <Stack>
              <Typography variant="h6">{t('global.notFound')}</Typography>
              <Typography>
                {t('global.notFoundDesc', { search: search })}
              </Typography>
            </Stack>
          </Box>
        )}
        {!homeworkCopy.length && !search && !firstLoading && (
          <Box sx={{ textAlign: 'center' }}>
            <Stack>
              <Typography variant="h6">
                {tab ? t('homework.emptyDone') : t('homework.letsAdd')}
              </Typography>
            </Stack>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Homework;
