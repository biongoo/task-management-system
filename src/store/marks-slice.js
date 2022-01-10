import { createSlice } from '@reduxjs/toolkit';

import addMark from './marks/addMark';
import getMarks from './marks/getMarks';
import editMark from './marks/editMark';
import deleteMark from './marks/deleteMark';

const initialState = {
  marks: [],
  loading: false,
  firstLoading: true,
};

const marksSlice = createSlice({
  name: 'marks',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [getMarks.pending]: (state) => {
      state.loading = true;
    },
    [getMarks.fulfilled]: (state, action) => {
      state.marks = action.payload;
      state.loading = false;
      state.firstLoading = false;
    },
    [addMark.fulfilled]: (state, action) => {
      const { mark, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.marks.push(mark);
    },
    [editMark.fulfilled]: (state, action) => {
      const { mark, statusCode } = action.payload;
      if (statusCode !== 200) return;

      const index = state.marks.findIndex((item) => item.id === mark.id);
      state.marks[index] = mark;
    },
    [deleteMark.fulfilled]: (state, action) => {
      const { id, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.marks = state.marks.filter((item) => item.id !== id);
    },
  },
});

export const { reset: resetMarks } = marksSlice.actions;

export default marksSlice.reducer;
