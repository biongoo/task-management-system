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
  name: 'auth',
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
        teacherId,
        firstName,
        lastName,
        teacherEmail,
        academicTitle,
        statusCode,
      } = action.payload;

      if (statusCode === 409) return;

      state.teachers.push({
        teacherId,
        firstName,
        lastName,
        teacherEmail,
        academicTitle,
      });
    },
    [editTeacher.fulfilled]: (state, action) => {
      const {
        teacherId,
        firstName,
        lastName,
        teacherEmail,
        academicTitle,
        statusCode,
      } = action.payload;

      if (statusCode === 409) return;

      const index = state.teachers.findIndex(
        (teacher) => teacher.teacherId === teacherId
      );

      state.teachers[index] = {
        teacherId,
        firstName,
        lastName,
        teacherEmail,
        academicTitle,
      };
    },
    [deleteTeacher.fulfilled]: (state, action) => {
      const { teacherId } = action.payload;

      state.teachers = state.teachers.filter(
        (teacher) => teacher.teacherId !== teacherId
      );
    },
  },
});

export default teachersSlice.reducer;
