import { createSlice } from '@reduxjs/toolkit';

import addUniversity from './universities/addUniversity';
import editUniversity from './universities/editUniversity';
import getUniversities from './universities/getUniversities';
import addFaculty from './universities/faculties/addFaculty';
import deleteUniversity from './universities/deleteUniversity';
import editFaculty from './universities/faculties/editFaculty';
import deleteFaculty from './universities/faculties/deleteFaculty';

const initialState = {
  universities: [],
  loading: false,
  firstLoading: true,
};

const universitiesSlice = createSlice({
  name: 'universities',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [getUniversities.pending]: (state) => {
      state.loading = true;
    },
    [getUniversities.fulfilled]: (state, action) => {
      state.universities = action.payload;
      state.loading = false;
      state.firstLoading = false;
    },
    [addUniversity.fulfilled]: (state, action) => {
      const { university, statusCode } = action.payload;

      if (statusCode !== 200) return;

      state.universities.push(university);
    },
    [editUniversity.fulfilled]: (state, action) => {
      const { university, statusCode } = action.payload;

      if (statusCode !== 200) return;

      const index = state.universities.findIndex(
        (item) => item.id === university.id
      );

      state.universities[index] = university;
    },
    [deleteUniversity.fulfilled]: (state, action) => {
      const { id, statusCode } = action.payload;

      if (statusCode !== 200) return;

      state.universities = state.universities.filter((item) => item.id !== id);
    },
    [addFaculty.fulfilled]: (state, action) => {
      const { faculty, universityId, statusCode } = action.payload;

      if (statusCode !== 200) return;

      const index = state.universities.findIndex(
        (item) => item.id === universityId
      );

      state.universities[index].faculties.push(faculty);
    },
    [editFaculty.fulfilled]: (state, action) => {
      const { faculty, universityId, statusCode } = action.payload;

      if (statusCode !== 200) return;

      const index = state.universities.findIndex(
        (item) => item.id === universityId
      );

      const indexFaculty = state.universities[index].faculties.findIndex(
        (item) => item.id === faculty.id
      );

      state.universities[index].faculties[indexFaculty] = faculty;
    },
    [deleteFaculty.fulfilled]: (state, action) => {
      const { id, universityId, statusCode } = action.payload;

      if (statusCode !== 200) return;

      const index = state.universities.findIndex(
        (item) => item.id === universityId
      );

      state.universities[index].faculties = state.universities[
        index
      ].faculties.filter((item) => item.id !== id);
    },
  },
});

export const { reset: resetUniversities } = universitiesSlice.actions;

export default universitiesSlice.reducer;
