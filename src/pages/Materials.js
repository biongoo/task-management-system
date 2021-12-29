import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Stack, Backdrop, CircularProgress } from '@mui/material';

import Sort from '../components/UI/Sorts/Sort';
import Search from '../components/UI/Inputs/Search';
import getMaterials from '../store/materials/getMaterials';
import AddMaterial from '../components/Materials/AddMaterial';
import MaterialsList from '../components/Materials/MaterialsList';

function groupItemBy(array, property) {
  var hash = {},
    props = property.split('.');
  for (var i = 0; i < array.length; i++) {
    var key = props.reduce(function (acc, prop) {
      return acc && acc[prop];
    }, array[i]);
    if (!hash[key]) hash[key] = [];
    hash[key].push(array[i]);
  }
  return hash;
}

const Materials = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [selectedSortingIndex, setSelectedSortingIndex] = useState(0);
  const { materials, loading, firstLoading } = useSelector(
    (state) => state.materials
  );

  useEffect(() => {
    dispatch(getMaterials());
  }, [dispatch]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  let materialsList = materials.slice();

  if (search) {
    materialsList = materialsList.filter((material) =>
      `${material.teacherSubjectType.subject.name}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  switch (selectedSortingIndex) {
    case 0:
      materialsList = materialsList.sort((a, b) =>
        a.teacherSubjectType.subject.name.localeCompare(
          b.teacherSubjectType.subject.name
        )
      );
      break;
    case 1:
      materialsList = materialsList.sort((a, b) =>
        b.teacherSubjectType.subject.name.localeCompare(
          a.teacherSubjectType.subject.name
        )
      );
      break;
    case 2:
      break;
    case 3:
      materialsList = materialsList.reverse();
      break;
    default:
      break;
  }

  materialsList = groupItemBy(materialsList, 'teacherSubjectType.subject.name');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading && firstLoading && !materialsList.length}
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
            <AddMaterial />
          </Stack>
        </Stack>

        <MaterialsList
          materials={materialsList}
          search={search}
          loading={loading}
        />
      </Paper>
    </Box>
  );
};

export default Materials;
