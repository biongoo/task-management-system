import { createSlice } from '@reduxjs/toolkit';

import getTeachers from './teachers/getTeachers';
import addTeacher from './teachers/addTeacher';
import editTeacher from './teachers/editTeacher';
import deleteTeacher from './teachers/deleteTeacher';

const initialState = {
  teachers: [],
  loading: false,
};

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
  extraReducers: {
    [getTeachers.pending]: (state) => {
      state.loading = true;
    },
    [getTeachers.fulfilled]: (state, action) => {
      state.teachers = action.payload;
      state.loading = false;
    },
    [addTeacher.fulfilled]: (state, action) => {
      const {
        id,
        firstName,
        lastName,
        teacherEmail,
        academicTitle,
        statusCode,
      } = action.payload;

      if (statusCode === 409) return;

      state.teachers.push({
        id,
        firstName,
        lastName,
        teacherEmail,
        academicTitle,
      });
    },
    [editTeacher.fulfilled]: (state, action) => {
      const {
        id,
        firstName,
        lastName,
        teacherEmail,
        academicTitle,
        statusCode,
      } = action.payload;

      if (statusCode === 409) return;

      const index = state.teachers.findIndex(
        (teacher) => teacher.id === id
      );

      state.teachers[index] = {
        id,
        firstName,
        lastName,
        teacherEmail,
        academicTitle,
      };
    },
    [deleteTeacher.fulfilled]: (state, action) => {
      const { id } = action.payload;

      state.teachers = state.teachers.filter(
        (teacher) => teacher.id !== id
      );
    },
  },
});

export default teachersSlice.reducer;
