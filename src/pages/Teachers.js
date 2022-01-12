import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Stack, Backdrop, CircularProgress } from '@mui/material';

import Sort from '../components/UI/Sorts/Sort';
import Search from '../components/UI/Inputs/Search';
import getTeachers from '../store/teachers/getTeachers';
import AddTeacher from '../components/Teachers/AddTeacher';
import TeachersList from '../components/Teachers/TeachersList';

const Teachers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const typeOfAccount = useSelector((state) => state.auth.type);
  const [selectedSortingIndex, setSelectedSortingIndex] = useState(0);

  if (+typeOfAccount !== 1) {
    navigate('/404');
  }

  const { teachers, loading, firstLoading } = useSelector(
    (state) => state.teachers
  );

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
        open={loading && firstLoading && !teachersList.length}
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
            <Sort
              selectedIndex={selectedSortingIndex}
              setSelectedIndex={setSelectedSortingIndex}
            />
            <AddTeacher />
          </Stack>
        </Stack>

        <TeachersList
          teachersList={teachersList}
          search={search}
          loading={firstLoading}
        />
      </Paper>
    </Box>
  );
};

export default Teachers;
