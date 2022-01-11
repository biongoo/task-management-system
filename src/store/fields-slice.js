import { createSlice } from '@reduxjs/toolkit';

import addField from './fields/addField';
import getFields from './fields/getFields';
import editField from './fields/editField';
import deleteField from './fields/deleteField';

const initialState = {
  fields: [],
  loading: false,
  firstLoading: true,
};

const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [getFields.pending]: (state) => {
      state.loading = true;
    },
    [getFields.fulfilled]: (state, action) => {
      state.fields = action.payload;
      state.loading = false;
      state.firstLoading = false;
    },
    [addField.fulfilled]: (state, action) => {
      const { field, statusCode } = action.payload;

      if (statusCode !== 200) return;

      state.fields.push(field);
    },
    [editField.fulfilled]: (state, action) => {
      const { field, statusCode } = action.payload;

      if (statusCode !== 200) return;

      const index = state.fields.findIndex((item) => item.id === field.id);

      state.fields[index] = field;
    },
    [deleteField.fulfilled]: (state, action) => {
      const { id, statusCode } = action.payload;

      if (statusCode !== 200) return;

      state.fields = state.fields.filter((item) => item.id !== id);
    },
  },
});

export const { reset: resetFields } = fieldsSlice.actions;

export default fieldsSlice.reducer;
