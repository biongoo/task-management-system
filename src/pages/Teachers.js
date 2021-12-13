import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Stack, Backdrop, CircularProgress } from '@mui/material';

import Add from '../components/Teachers/Add';
import Search from '../components/Teachers/Search';
import Filter from '../components/Teachers/Filter';
import TeachersList from '../components/Teachers/TeachersList';
import getTeachers from '../store/teachers/getTeachers';

const Teachers = () => {
  const dispatch = useDispatch();
  const { teachers, loading } = useSelector((state) => state.teachers);

  const [search, setSearch] = useState('');
  const [selectedSortingIndex, setSelectedSortingIndex] = useState(0);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  let teachersList = teachers.slice();

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  if (search) {
    teachersList = teachersList.filter((teacher) =>
      `${teacher.academicTitle} ${teacher.firstName} ${teacher.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  switch (selectedSortingIndex) {
    case 0:
      teachersList = teachersList.sort(
        (a, b) =>
          a.firstName.localeCompare(b.firstName) ||
          a.lastName.localeCompare(b.lastName)
      );
      break;
    case 1:
      teachersList = teachersList.sort(
        (a, b) =>
          b.firstName.localeCompare(a.firstName) ||
          b.lastName.localeCompare(a.lastName)
      );
      break;
    case 2:
      break;
    case 3:
      teachersList = teachersList.reverse();
      break;
    default:
      break;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading && !teachersList.length}
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
          mb={3}
          mx={1}
          spacing={2}
        >
          <Search search={search} searchHandler={searchHandler} />
          <Stack direction="row">
            <Filter
              selectedIndex={selectedSortingIndex}
              setSelectedIndex={setSelectedSortingIndex}
            />
            <Add />
          </Stack>
        </Stack>

        <TeachersList
          teachersList={teachersList}
          search={search}
          loading={loading}
        />
      </Paper>
    </Box>
  );
};

export default Teachers;
