import { createSlice } from '@reduxjs/toolkit';

import addType from './subjects/addType';
import editType from './subjects/editType';
import getTypes from './subjects/getTypes';
import deleteType from './subjects/deleteType';
import addSubjectUser from './subjects/user/addSubjectUser';
import getSubjectsUser from './subjects/user/getSubjectsUser';
import deleteSubjectUser from './subjects/user/deleteSubjectUser';

const initialState = {
  subjects: [],
  types: [],
  loading: false,
  firstLoading: true,
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [getTypes.fulfilled]: (state, action) => {
      state.types = action.payload;
    },
    [getSubjectsUser.pending]: (state) => {
      state.loading = true;
    },
    [getSubjectsUser.fulfilled]: (state, action) => {
      state.subjects = action.payload;
      state.loading = false;
      state.firstLoading = false;
    },
    [addType.fulfilled]: (state, action) => {
      const { id, name, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.types.push({
        id,
        name,
      });
    },
    [editType.fulfilled]: (state, action) => {
      const { id, name, statusCode } = action.payload;
      if (statusCode !== 200) return;

      const index = state.types.findIndex((type) => type.id === id);
      state.types[index] = {
        id,
        name,
      };
    },
    [deleteType.fulfilled]: (state, action) => {
      const { id, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.types = state.types.filter((type) => type.id !== id);
    },
    [addSubjectUser.fulfilled]: (state, action) => {
      const { id, name, teacherTypeOriginal, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.subjects.push({
        id,
        name,
        teacherSubjectTypes: teacherTypeOriginal,
      });
    },
    [deleteSubjectUser.fulfilled]: (state, action) => {
      const { id, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.subjects = state.subjects.filter((type) => type.id !== id);
    },
  },
});

export const { reset: resetSubjects } = subjectsSlice.actions;

export default subjectsSlice.reducer;
