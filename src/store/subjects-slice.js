import { createSlice } from '@reduxjs/toolkit';

import addType from './subjects/addType';
import editType from './subjects/editType';
import getTypes from './subjects/getTypes';
import deleteType from './subjects/deleteType';

import getSubjects from './subjects/getSubjects';
import deleteSubject from './subjects/deleteSubject';
import addSubjectStudent from './subjects/student/addSubjectStudent';
import addSubjectTeacher from './subjects/teacher/addSubjectTeacher';
import editSubjectTeacher from './subjects/teacher/editSubjectTeacher';
import editSubjectStudent from './subjects/student/editSubjectStudent';

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
    [getSubjects.pending]: (state) => {
      state.loading = true;
    },
    [getSubjects.fulfilled]: (state, action) => {
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
    [addSubjectStudent.fulfilled]: (state, action) => {
      const { subject, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.subjects.push(subject);
    },
    [editSubjectStudent.fulfilled]: (state, action) => {
      const { subject, statusCode } = action.payload;
      if (statusCode !== 200) return;

      const index = state.subjects.findIndex((item) => item.id === subject.id);
      state.subjects[index] = subject;
    },
    [deleteSubject.fulfilled]: (state, action) => {
      const { id, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.subjects = state.subjects.filter((type) => type.id !== id);
    },
    [addSubjectTeacher.fulfilled]: (state, action) => {
      const { subject, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.subjects.push(subject);
    },
    [editSubjectTeacher.fulfilled]: (state, action) => {
      const { subject, statusCode } = action.payload;
      if (statusCode !== 200) return;

      const index = state.subjects.findIndex((item) => item.id === subject.id);
      state.subjects[index] = subject;
    },
  },
});

export const { reset: resetSubjects } = subjectsSlice.actions;

export default subjectsSlice.reducer;
