import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Stack, Backdrop, CircularProgress } from '@mui/material';

import Sort from '../components/UI/Sorts/Sort';
import getTypes from '../store/subjects/getTypes';
import Search from '../components/UI/Inputs/Search';
import Types from '../components/Subjects/Types/Types';
import AddSubject from '../components/Subjects/Student/Add';
import StudentSL from '../components/Subjects/Student/SubjectsList';
import getSubjectsUser from '../store/subjects/user/getSubjectsUser';

const Subjects = () => {
  const dispatch = useDispatch();
  const typeOfAccount = useSelector((state) => state.auth.type);
  const { subjects, types, loading, firstLoading } = useSelector(
    (state) => state.subjects
  );

  const [search, setSearch] = useState('');

  const [selectedSortingIndex, setSelectedSortingIndex] = useState(0);

  useEffect(() => {
    dispatch(getTypes());
    if (+typeOfAccount === 1) {
      dispatch(getSubjectsUser());
    }
  }, [dispatch, typeOfAccount]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  let subjectsList = subjects.slice();

  if (search) {
    subjectsList = subjectsList.filter((subject) =>
      `${subject.name}`.toLowerCase().includes(search.toLowerCase())
    );
  }

  switch (selectedSortingIndex) {
    case 0:
      subjectsList = subjectsList.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 1:
      subjectsList = subjectsList.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 2:
      break;
    case 3:
      subjectsList = subjectsList.reverse();
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
        open={loading && firstLoading && !subjectsList.length}
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
            <Types types={types} />
            {+typeOfAccount === 1 && <AddSubject />}
          </Stack>
        </Stack>

        {+typeOfAccount === 1 && (
          <StudentSL
            subjectsList={subjectsList}
            search={search}
            loading={loading}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Subjects;
