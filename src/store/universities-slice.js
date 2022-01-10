import { createSlice } from '@reduxjs/toolkit';

import addUniversity from './universities/addUniversity';
import editUniversity from './universities/editUniversity';
import getUniversities from './universities/getUniversities';
import deleteUniversity from './universities/deleteUniversity';

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
      const { id } = action.payload;

      state.universities = state.universities.filter((item) => item.id !== id);
    },
  },
});

export const { reset: resetUniversities } = universitiesSlice.actions;

export default universitiesSlice.reducer;
