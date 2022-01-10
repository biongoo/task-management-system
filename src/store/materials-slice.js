import { createSlice } from '@reduxjs/toolkit';

import addMaterial from './materials/addMaterial';
import editMaterial from './materials/editMaterial';
import getMaterials from './materials/getMaterials';
import deleteMaterial from './materials/deleteMaterial';

const initialState = {
  materials: [],
  loading: false,
  firstLoading: true,
};

const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    reset: () => initialState,
  },
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

      const index = state.materials.findIndex(
        (item) => item.id === material.id
      );
      state.materials[index] = material;
    },
    [deleteMaterial.fulfilled]: (state, action) => {
      const { id, statusCode } = action.payload;
      if (statusCode !== 200) return;

      state.materials = state.materials.filter((item) => item.id !== id);
    },
  },
});

export const { reset: resetMaterials } = materialsSlice.actions;

export default materialsSlice.reducer;
