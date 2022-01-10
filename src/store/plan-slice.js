import { createSlice } from '@reduxjs/toolkit';

import getPlan from './plan/getPlan';
import addPlan from './plan/addPlan';
import editPlan from './plan/editPlan';
import deletePlan from './plan/deletePlan';

const initialState = {
  plan: [],
  loading: false,
  firstLoading: true,
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [getPlan.pending]: (state) => {
      state.loading = true;
    },
    [getPlan.fulfilled]: (state, action) => {
      state.plan = action.payload;
      state.loading = false;
      state.firstLoading = false;
    },
    [addPlan.fulfilled]: (state, action) => {
      const { planElement, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.plan.push(planElement);
    },
    [editPlan.fulfilled]: (state, action) => {
      const { planElement, statusCode } = action.payload;
      if (statusCode !== 200) return;

      const index = state.plan.findIndex((item) => item.id === planElement.id);
      state.plan[index] = planElement;
    },
    [deletePlan.fulfilled]: (state, action) => {
      const { id, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.plan = state.plan.filter((item) => item.id !== id);
    },
  },
});

export const { reset: resetPlan } = planSlice.actions;

export default planSlice.reducer;
