import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Stack, Backdrop, CircularProgress } from '@mui/material';

import getMarks from '../store/marks/getMarks';
import Sort from '../components/UI/Sorts/Sort';
import { groupItemBy } from '../utils/helpers';
import AddMark from '../components/Marks/AddMark';
import Search from '../components/UI/Inputs/Search';
import MarksList from '../components/Marks/MarksList';

const Marks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const typeOfAccount = useSelector((state) => state.auth.type);
  const [selectedSortingIndex, setSelectedSortingIndex] = useState(0);

  if (+typeOfAccount !== 1) {
    navigate('/404');
  }

  const { marks, loading, firstLoading } = useSelector((state) => state.marks);

  useEffect(() => {
    dispatch(getMarks());
  }, [dispatch]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  let marksList = marks.slice();

  if (search) {
    marksList = marksList.filter((material) =>
      `${material.teacherSubjectType.subject.name}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  switch (selectedSortingIndex) {
    case 0:
      marksList = marksList.sort((a, b) =>
        a.teacherSubjectType.subject.name.localeCompare(
          b.teacherSubjectType.subject.name
        )
      );
      break;
    case 1:
      marksList = marksList.sort((a, b) =>
        b.teacherSubjectType.subject.name.localeCompare(
          a.teacherSubjectType.subject.name
        )
      );
      break;
    case 2:
      break;
    case 3:
      marksList = marksList.reverse();
      break;
    default:
      break;
  }

  marksList = groupItemBy(marksList, 'teacherSubjectType.subject.name');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading && firstLoading && !marksList.length}
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
              alphabeticOnly={true}
            />
            <AddMark />
          </Stack>
        </Stack>

        <MarksList marks={marksList} search={search} loading={firstLoading} />
      </Paper>
    </Box>
  );
};

export default Marks;
