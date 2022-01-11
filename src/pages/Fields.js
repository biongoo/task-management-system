import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Stack, Backdrop, CircularProgress } from '@mui/material';

import Sort from '../components/UI/Sorts/Sort';
import getFields from '../store/fields/getFields';
import Search from '../components/UI/Inputs/Search';
import AddField from '../components/Fields/AddField';
import FieldsList from '../components/Fields/FieldsList';

const Fields = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const typeOfAccount = useSelector((state) => state.auth.type);
  const [selectedSortingIndex, setSelectedSortingIndex] = useState(0);

  if (+typeOfAccount !== 2) {
    navigate('/404');
  }

  const { fields, loading, firstLoading } = useSelector(
    (state) => state.fields
  );

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  let fieldsList = fields.slice();

  useEffect(() => {
    dispatch(getFields());
  }, [dispatch]);

  if (search) {
    fieldsList = fieldsList.filter((university) =>
      university.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  switch (selectedSortingIndex) {
    case 0:
      fieldsList = fieldsList.sort(
        (a, b) => a.name.localeCompare(b.name) || a.name.localeCompare(b.name)
      );
      break;
    case 1:
      fieldsList = fieldsList.sort(
        (a, b) => b.name.localeCompare(a.name) || b.name.localeCompare(a.name)
      );
      break;
    case 2:
      break;
    case 3:
      fieldsList = fieldsList.reverse();
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
        open={loading && firstLoading && !fieldsList.length}
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
            <AddField />
          </Stack>
        </Stack>

        <FieldsList
          fieldsList={fieldsList}
          search={search}
          loading={firstLoading}
        />
      </Paper>
    </Box>
  );
};

export default Fields;
