import { createSlice } from '@reduxjs/toolkit';

import addType from './subjects/addType';
import getTypes from './subjects/getTypes';

const initialState = {
  subjects: [],
  types: [],
  loading: false,
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {},
  extraReducers: {
    [getTypes.fulfilled]: (state, action) => {
      state.types = action.payload;
    },
    [addType.fulfilled]: (state, action) => {
      const { id, name, statusCode } = action.payload;

      if (statusCode === 409) return;

      state.types.push({
        id,
        name,
      });
    },
  },
});

export default subjectsSlice.reducer;
