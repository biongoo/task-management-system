import { createSlice } from '@reduxjs/toolkit';

import addMaterial from './materials/addMaterial';
import editMaterial from './materials/editMaterial';
import getMaterials from './materials/getMaterials';

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
    [addMaterial.fulfilled]: (state, action) => {
      const { statusCode, material } = action.payload;
      if (statusCode !== 200) return;

      state.materials.push(material);
    },
    [editMaterial.fulfilled]: (state, action) => {
      const { statusCode, material } = action.payload;
      if (statusCode !== 200) return;

      console.log(action.payload);

      /* const index = state.plan.findIndex((item) => item.id === material.id);
      state.plan[index] = material; */
    },
    /* [deletePlan.fulfilled]: (state, action) => {
      const { id, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.plan = state.plan.filter((item) => item.id !== id);
    }, */
  },
});

export default materialsSlice.reducer;
