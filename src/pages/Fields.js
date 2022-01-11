import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Stack, Backdrop, CircularProgress } from '@mui/material';

import Sort from '../components/UI/Sorts/Sort';
import Search from '../components/UI/Inputs/Search';
import getUniversities from '../store/universities/getUniversities';
import AddUniversity from '../components/Universities/AddUniveristy';
import UniversitiesList from '../components/Universities/UniversitiesList';

const Fields = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const typeOfAccount = useSelector((state) => state.auth.type);
  const [selectedSortingIndex, setSelectedSortingIndex] = useState(0);

  if (+typeOfAccount !== 2) {
    navigate('/404');
  }

  const { universities, loading, firstLoading } = useSelector(
    (state) => state.universities
  );

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  let universitiesList = universities.slice();

  useEffect(() => {
    dispatch(getUniversities());
  }, [dispatch]);

  if (search) {
    universitiesList = universitiesList.filter((university) =>
      university.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  switch (selectedSortingIndex) {
    case 0:
      universitiesList = universitiesList.sort(
        (a, b) => a.name.localeCompare(b.name) || a.name.localeCompare(b.name)
      );
      break;
    case 1:
      universitiesList = universitiesList.sort(
        (a, b) => b.name.localeCompare(a.name) || b.name.localeCompare(a.name)
      );
      break;
    case 2:
      break;
    case 3:
      universitiesList = universitiesList.reverse();
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
        open={loading && firstLoading && !universitiesList.length}
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
            <AddUniversity />
          </Stack>
        </Stack>

        <UniversitiesList
          universitiesList={universitiesList}
          search={search}
          loading={firstLoading}
        />
      </Paper>
    </Box>
  );
};

export default Fields;
