import { createSlice } from '@reduxjs/toolkit';

import getHomework from './homework/getHomework';
import addHomework from './homework/addHomework';

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
    /* [editType.fulfilled]: (state, action) => {
      const { id, name, statusCode } = action.payload;
      if (statusCode !== 200) return;

      const index = state.homework.findIndex((type) => type.id === id);
      state.homework[index] = {
        id,
        name,
      };
    }, */
    /* [deleteType.fulfilled]: (state, action) => {
      const { id, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.homework = state.homework.filter((type) => type.id !== id);
    }, */
  },
});

export default homeworkSlice.reducer;
