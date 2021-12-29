import { createSlice } from '@reduxjs/toolkit';

import getMaterials from './materials/getMaterials';
/*
import addPlan from './plan/addPlan';
import editPlan from './plan/editPlan';
import deletePlan from './plan/deletePlan'; */

const initialState = {
  materials: [],
  loading: false,
  firstLoading: true,
};

const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {},
  extraReducers: {
    [getMaterials.pending]: (state) => {
      state.loading = true;
    },
    [getMaterials.fulfilled]: (state, action) => {
      state.materials = action.payload;
      state.loading = false;
      state.firstLoading = false;
    },
    /* [addPlan.fulfilled]: (state, action) => {
      const {
        id,
        day,
        startTime,
        endTime,
        repetition,
        teacherSubjectType,
        statusCode,
      } = action.payload;

      if (statusCode !== 200) return;

      state.plan.push({
        id,
        day,
        startTime,
        endTime,
        teacherSubjectType,
        repetition,
      });
    },
    [editPlan.fulfilled]: (state, action) => {
      const {
        id,
        day,
        startTime,
        endTime,
        repetition,
        teacherSubjectType,
        statusCode,
      } = action.payload;
      if (statusCode !== 200) return;

      const index = state.plan.findIndex((item) => item.id === id);
      state.plan[index] = {
        id,
        day,
        startTime,
        endTime,
        teacherSubjectType,
        repetition,
      };
    },
    [deletePlan.fulfilled]: (state, action) => {
      const { id, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.plan = state.plan.filter((item) => item.id !== id);
    }, */
  },
});

export default materialsSlice.reducer;
