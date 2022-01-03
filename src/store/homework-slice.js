import { createSlice } from '@reduxjs/toolkit';

import getHomework from './homework/getHomework';
import addHomework from './homework/addHomework';
import editHomework from './homework/editHomework';
import deleteHomework from './homework/deleteHomework';
import finishHomework from './homework/finishHomework';

const initialState = {
  homework: [],
  loading: false,
  firstLoading: true,
};

const homeworkSlice = createSlice({
  name: 'homework',
  initialState,
  reducers: {},
  extraReducers: {
    [getHomework.pending]: (state) => {
      state.loading = true;
    },
    [getHomework.fulfilled]: (state, action) => {
      state.homework = action.payload;
      state.loading = false;
      state.firstLoading = false;
    },
    [addHomework.fulfilled]: (state, action) => {
      const { statusCode, homework } = action.payload;
      if (statusCode !== 200) return;

      state.homework.push(homework);
    },
    [editHomework.fulfilled]: (state, action) => {
      const { statusCode, homework } = action.payload;
      if (statusCode !== 200) return;

      const index = state.homework.findIndex((item) => item.id === homework.id);
      state.homework[index] = homework;
    },
    [deleteHomework.fulfilled]: (state, action) => {
      const { id, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.homework = state.homework.filter((item) => item.id !== id);
    },
    [finishHomework.fulfilled]: (state, action) => {
      const { statusCode, homework } = action.payload;
      if (statusCode !== 200) return;

      const index = state.homework.findIndex((item) => item.id === homework.id);
      state.homework[index] = homework;
    },
  },
});

export default homeworkSlice.reducer;
