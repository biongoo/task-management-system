import { createSlice } from '@reduxjs/toolkit';
import { purple } from '@mui/material/colors';

const initialState = {
  mode: localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light',
  color: localStorage.getItem('color')
    ? localStorage.getItem('color')
    : purple[500],
};

const paletteSlice = createSlice({
  name: 'palette',
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
    changeColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { changeMode, changeColor } = paletteSlice.actions;

export default paletteSlice.reducer;
